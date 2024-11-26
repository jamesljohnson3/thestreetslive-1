'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import { Bell, Calendar, Star, DollarSign, UserCircle, Navigation2, Shield, HelpCircle, Fuel, Lock, Unlock, RefreshCw, Layers } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import * as turf from '@turf/turf'

mapboxgl.accessToken = 'pk.eyJ1IjoiamozbWVkaWEiLCJhIjoiY2w4bnplZXBoMTZuNzNwdG9uODdtdGVsMiJ9.tk0WVTDnjWEXCkmGLJKwGw'

interface TrackingDriversPageProps {
  driverId: string
}

interface Order {
  id: string
  status: string
  pickup: [number, number]
  dropoff: [number, number]
}

const predefinedRoutes = [
  { name: 'Atlanta', coordinates: [-84.3880, 33.7490] },
  { name: 'Seattle', coordinates: [-122.208735, 47.676892] },
  { name: 'New York', coordinates: [-74.0060, 40.7128] },
  { name: 'Los Angeles', coordinates: [-118.2437, 34.0522] },
]

export default function Component({ driverId }: TrackingDriversPageProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const directionsRef = useRef<MapboxDirections | null>(null)
  const watchPositionId = useRef<number | null>(null)
  const userLocationMarker = useRef<mapboxgl.Marker | null>(null)
  const [activeTab, setActiveTab] = useState('dash')
  const [isOnline, setIsOnline] = useState(false)
  const [earnings, setEarnings] = useState(0)
  const [currentLocation, setCurrentLocation] = useState('SEA: Southern Seattle')
  const [gasPrice, setGasPrice] = useState(3.89)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<[number, number] | null>(null)
  const [route, setRoute] = useState<{
    duration: number
    distance: number
    currentRoad: string
    nextExit: string
  }>({
    duration: 0,
    distance: 0,
    currentRoad: '',
    nextExit: '',
  })
  const [isNavigating, setIsNavigating] = useState(false)
  const [isCloseUpView, setIsCloseUpView] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isLocked, setIsLocked] = useState(true)
  const [showRecenterButton, setShowRecenterButton] = useState(false)
  const [showOverview, setShowOverview] = useState(false)
  const [isTracking, setIsTracking] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)

  const initializeMap = useCallback(() => {
    if (mapContainer.current && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-95.7129, 37.0902], // Center of USA
        zoom: 3,
        pitch: 0,
      })

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'imperial',
        profile: 'mapbox/driving',
        alternatives: true,
        geometries: 'geojson',
        controls: { instructions: false },
        flyTo: false,
        interactive: false,
      })
      
      directionsRef.current = directions
      map.current.addControl(directions, 'top-left')

      directions.on('route', (e: { route: any[] }) => {
        if (e.route && e.route[0]) {
          const route = e.route[0]
          setRoute({
            duration: route.duration / 60,
            distance: route.distance * 0.000621371,
            currentRoad: route.legs[0]?.steps[0]?.name || 'Unknown Road',
            nextExit: route.legs[0]?.steps[1]?.name || 'No exit',
          })
        }
      })

      map.current.on('movestart', () => {
        if (isLocked && isNavigating) {
          setShowRecenterButton(true)
        }
      })

      // Add markers for predefined routes
      predefinedRoutes.forEach((route) => {
        const marker = new mapboxgl.Marker({ color: '#FF0000' })
          .setLngLat(route.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${route.name}</h3>`))
          .addTo(map.current!)

        const el = marker.getElement()
        el.addEventListener('click', () => {
          setSelectedDestination(route.coordinates)
          setCurrentLocation(route.name)
        })
      })

      // Add busy area indicator
      const busyArea = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: 'busy-area-popup'
      })
        .setLngLat([-122.2, 47.61])
        .setHTML('<div class="bg-red-500 text-white px-4 py-1 rounded-full font-semibold">Busy</div>')
        .addTo(map.current)
    }
  }, [isLocked, isNavigating])

  const toggleLock = useCallback(() => {
    setIsLocked((prevIsLocked) => {
      if (prevIsLocked) {
        setShowRecenterButton(true)
      } else {
        recenterMap()
      }
      return !prevIsLocked
    })
  }, [])

  const recenterMap = useCallback(() => {
    if (map.current && userLocation) {
      map.current.easeTo({
        center: userLocation,
        zoom: 18,
        pitch: 60,
        bearing: 0,
        duration: 1000,
      })
      setShowRecenterButton(false)
    }
  }, [userLocation])

  const toggleOverview = useCallback(() => {
    setShowOverview((prevShowOverview) => {
      if (map.current && directionsRef.current) {
        const waypoints = directionsRef.current.getWaypoints()
        
        if (waypoints.length > 0) {
          const bounds = new mapboxgl.LngLatBounds()
          
          waypoints.forEach((waypoint) => {
            bounds.extend(waypoint.coordinates)
          })
    
          map.current.fitBounds(bounds, { padding: 100, duration: 1000 })
        } else {
          console.warn('No waypoints found to display the route overview.')
          if (userLocation) {
            map.current.easeTo({
              center: userLocation,
              zoom: 14,
              duration: 1000,
            })
          }
        }
      }
      return !prevShowOverview
    })
  }, [userLocation])

  const updateUserLocation = useCallback((position: GeolocationPosition) => {
    const { longitude, latitude } = position.coords
    setUserLocation([longitude, latitude])
    if (map.current) {
      if (!userLocationMarker.current) {
        userLocationMarker.current = new mapboxgl.Marker({ color: '#FF0000' })
          .setLngLat([longitude, latitude])
          .addTo(map.current)
      } else {
        userLocationMarker.current.setLngLat([longitude, latitude])
      }
      if (isNavigating && isCloseUpView && isLocked) {
        map.current.easeTo({
          center: [longitude, latitude],
          zoom: 18,
          pitch: 60,
          bearing: 0,
          duration: 1000,
        })
      }
      if (directionsRef.current && selectedDestination) {
        directionsRef.current.setOrigin([longitude, latitude])
      }
      if (selectedDestination) {
        const distance = turf.distance(
          turf.point([longitude, latitude]),
          turf.point(selectedDestination),
          { units: 'meters' }
        )
        if (distance < 50) {
          endNavigation()
          setShowSuccessModal(true)
        }
      }
    }
  }, [isNavigating, isCloseUpView, isLocked, selectedDestination])

  const calculateRoute = useCallback((origin: [number, number], destination: [number, number]) => {
    if (directionsRef.current) {
      directionsRef.current.setOrigin(origin)
      directionsRef.current.setDestination(destination)
    }
  }, [])
  const startNavigation = () => {
    if (!map.current || !directionsRef.current || !userLocation || !selectedDestination) return;
    setIsNavigating(true);
    setIsCloseUpView(true);
    setIsTracking(!isTracking)
    setIsLocked(true)
    setShowOverview(false)
    // Get the current route
    const origin = directionsRef.current.getOrigin();
    const destination = directionsRef.current.getDestination();
    if (origin && destination) {
      // Ensure the map centers on the user's location with a fixed zoom level and pitch for navigation
      map.current.easeTo({
        center: userLocation,
        zoom: 18, // Lock zoom to 18 during navigation
        pitch: 60, // Lock pitch to 60 degrees during navigation
        bearing: map.current.getBearing(),
        duration: 1000, // Optional: Make the transition smoother
      }, { animate: false }); // Prevent further animations
  
      // Update route information
      const routeData = directionsRef.current.getWaypoints();
      if (routeData && routeData.length >= 2) {
        const leg = routeData[0];
        setRoute({
          duration: leg.duration / 60, // Convert to minutes
          distance: leg.distance * 0.000621371, // Convert to miles
          currentRoad: leg.name || 'Unknown Road',
          nextExit: routeData[1]?.name || 'No exit',
        });
      }
  
    // Start tracking GPS location
if ('geolocation' in navigator) {
  watchPositionId.current = navigator.geolocation.watchPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      console.log(`Client: GPS position - Latitude: ${latitude}, Longitude: ${longitude}`);
      updateUserLocation(position);
      // Update the map view without changing the zoom
      if (map.current) {  // Add this null check
        map.current.easeTo({
          center: [longitude, latitude],
          zoom: 18, // Keep the zoom level constant
          pitch: 60,
          bearing: map.current.getBearing(),
          duration: 1000,
        }, { animate: false });
      }
    },
    (error) => console.error('Error watching position:', error),
    { enableHighAccuracy: true }
        );
      }
    }
  };

  const endNavigation = useCallback(() => {
    setIsNavigating(false)
    setIsCloseUpView(false)
    setSelectedDestination(null)
    setIsTracking(false)
    if (map.current && directionsRef.current) {
      directionsRef.current.removeRoutes()
      map.current.easeTo({ pitch: 0, zoom: 3, center: [-95.7129, 37.0902] })
    }
    if (watchPositionId.current !== null) {
      navigator.geolocation.clearWatch(watchPositionId.current)
      watchPositionId.current = null
    }
  }, [])

  const setDestination = useCallback((coordinates: [number, number]) => {
    setSelectedDestination(coordinates)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords
          setUserLocation([longitude, latitude])
          calculateRoute([longitude, latitude], coordinates)
        },
        (error) => console.error('Error getting current position:', error),
        { enableHighAccuracy: true }
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }, [calculateRoute])

  const toggleView = useCallback(() => {
    setIsCloseUpView((prevIsCloseUpView) => {
      if (map.current && userLocation) {
        map.current.easeTo({
          center: userLocation,
          zoom: prevIsCloseUpView ? 14 : 18,
          pitch: prevIsCloseUpView ? 0 : 60,
          bearing: map.current.getBearing(),
          duration: 1000,
        })
      }
      return !prevIsCloseUpView
    })
  }, [userLocation])

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline)
  }

  useEffect(() => {
    initializeMap()

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords
          setUserLocation([longitude, latitude])
          if (map.current) {
            map.current.setCenter([longitude, latitude])
          }
        },
        (error) => console.error('Error getting initial position:', error),
        { enableHighAccuracy: true }
      )
    }

    return () => {
      map.current?.remove()
      if (watchPositionId.current !== null) {
        navigator.geolocation.clearWatch(watchPositionId.current)
      }
    }
  }, [initializeMap])

  useEffect(() => {
    const orderPolling = setInterval(async () => {
      console.log('Client: Checking for assigned orders...')
      try {
        const response = await fetch(`/api/check-order?driverId=${driverId}`)
        const data = await response.json()
        if (data.success && data.order) {
          console.log(`Client: New order assigned - Order ID: ${data.order.id}, Status: ${data.order.status}`)
          setCurrentOrder(data.order)
        } else {
          console.log('Client: No new orders found')
        }
      } catch (error) {
        console.error('Error checking for orders:', error)
      }
    }, 5000)

    return () => {
      console.log('Client: Stopping order polling')
      clearInterval(orderPolling)
    }
  }, [driverId])

  const handleAcceptOrder = async () => {
    if (currentOrder) {
      console.log('Client: Accepting order', currentOrder.id)
      try {
        const response = await fetch('/api/accept-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId: currentOrder.id, driverId }),
        })
        const data = await response.json()
        if (data.success) {
          setSelectedDestination(currentOrder.pickup)
          setCurrentLocation(`Pickup: Order #${currentOrder.id}`)
          setCurrentOrder(null)
          startNavigation()
        } else {
          console.error('Failed to accept order:', data.message)
        }
      } catch (error) {
        console.error('Error accepting order:', error)
      }
    }
  }

  const handleRejectOrder = () => setCurrentOrder(null)

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] text-white">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-[#000000]/80 backdrop-blur">
        <span className="text-sm">9:43</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4">
            <svg viewBox="0 0 24 24" className="fill-current">
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zM12 19c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
            </svg>
          </div>
          <div className="w-4 h-4">
            <svg viewBox="0 0 24 24" className="fill-current">
              <path d="M2 22h20V2L2 22z"/>
            </svg>
          </div>
          <div className="w-6 h-4 border border-white rounded-sm flex items-center px-0.5">
            <div className="bg-white w-4 h-2.5"></div>
          </div>
        </div>
      </div>

      {/* Top Actions */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
        <Bell className="w-6 h-6" />
        <Card className="bg-black/80 backdrop-blur border-0">
          <CardContent className="p-2 flex items-center gap-2">
            <Navigation2 className="w-4 h-4" />
            <span className="font-medium">Promos</span>
          </CardContent>
        </Card>
        <div className="flex gap-2">
          <Shield className="w-6 h-6" />
          <HelpCircle className="w-6 h-6" />
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <div ref={mapContainer} className="h-full" />
        
        {/* Gas Price Indicator */}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur rounded-lg p-2 flex items-center gap-2">
          <Fuel className="w-4 h-4" />
          <span className="font-semibold">${gasPrice.toFixed(2)}</span>
        </div>

        {/* Navigation Controls */}
        {isNavigating && (
          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <Button variant="secondary" onClick={toggleLock}>
              {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            </Button>
            <Button variant="secondary" onClick={toggleOverview}>
              <Layers className="w-4 h-4" />
            </Button>
          </div>
        )}

        {showRecenterButton && (
          <Button
            className="absolute bottom-20 right-4"
            onClick={recenterMap}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Recenter
          </Button>
        )}
      </div>

      {/* Location Card */}
      <div className="absolute bottom-20 left-4 right-4">
        <Card className="bg-black/90 backdrop-blur border-0">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">{currentLocation}</h2>
            <Button 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              size="lg"
              onClick={startNavigation}
              disabled={!selectedDestination || isNavigating}
            >
              {isNavigating ? 'Navigating...' : 'Dash Now'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-black/90 backdrop-blur border-t border-gray-800">
        <div className="flex justify-around">
          {[
            { id: 'dash', icon: Navigation2, label: 'Dash', color: 'text-red-500' },
            { id: 'schedule', icon: Calendar, label: 'Schedule' },
            { id: 'account', icon: UserCircle, label: 'Account' },
            { id: 'ratings', icon: Star, label: 'Ratings' },
            { id: 'earnings', icon: DollarSign, label: 'Earnings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-4 ${
                activeTab === item.id ? item.color || 'text-white' : 'text-gray-400'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* New Order Modal */}
      <Dialog open={!!currentOrder} onOpenChange={() => setCurrentOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Order</DialogTitle>
          </DialogHeader>
          <p>You have a new order to deliver!</p>
          <p>Order ID: {currentOrder?.id}</p>
          <p>Status: {currentOrder?.status}</p>
          <DialogFooter>
            <Button variant="outline" onClick={handleRejectOrder}>Reject</Button>
            <Button onClick={handleAcceptOrder}>Accept</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Destination Reached</DialogTitle>
          </DialogHeader>
          <p>Congratulations! You have successfully arrived at your destination.</p>
          <Button onClick={() => setShowSuccessModal(false)}>Close</Button>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .mapboxgl-ctrl-top-left,
        .mapboxgl-ctrl-top-right,
        .mapboxgl-ctrl-bottom-left,
        .mapboxgl-ctrl-bottom-right {
          display: none !important;
        }
        .busy-area-popup .mapboxgl-popup-content {
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0;
        }
        .busy-area-popup .mapboxgl-popup-tip {
          display: none;
        }
      `}</style>
    </div>
  )
}
