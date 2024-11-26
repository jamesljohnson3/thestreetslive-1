'use client'

import React, { useEffect, useRef, useState } from 'react'
import mapboxgl, { LngLatBoundsLike, LngLatLike } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import { Volume2, Info, MessageSquare, X, Navigation, Map, Maximize, Minimize, Unlock, Lock, Bell, Calendar, DollarSign, Fuel, HelpCircle, Layers, Navigation2, RefreshCw, Shield, Star, UserCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import * as turf from '@turf/turf'
import { saveCurrentLocation, checkOrder, acceptOrder } from '@/actions/locate';
import OrderAcceptPopup from './OrderAcceptPopup';
interface TrackingDriversPageProps {
  driverId: string;
}

interface Order {
  id: string;
  status: string;
}

// Set Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiamozbWVkaWEiLCJhIjoiY2w4bnplZXBoMTZuNzNwdG9uODdtdGVsMiJ9.tk0WVTDnjWEXCkmGLJKwGw'

const predefinedRoutes = [
  { name: 'Atlanta', coordinates: [-84.3880, 33.7490] },
  { name: 'Seattle', coordinates: [-122.208735, 47.676892] },  // Kirkland, WA
]

export default function GPSwithTrackingDriverPage({ driverId }: TrackingDriversPageProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const directionsRef = useRef<MapboxDirections | null>(null)
  const watchPositionId = useRef<number | null>(null)
  const userLocationMarker = useRef<mapboxgl.Marker | null>(null)
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
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [pathCoordinates, setPathCoordinates] = useState<Array<{ latitude: number; longitude: number }>>([]);
  const initialViewState = {
    latitude: 47.6062,  // Seattle Latitude
    longitude: -122.3321,  // Seattle Longitude
    zoom: 20,  // Starting zoom level for the map
  };
  const [viewState, setViewState] = useState(initialViewState);
  const [isLocked, setIsLocked] = useState(true)
  const [showRecenterButton, setShowRecenterButton] = useState(false)
  const [showOverview, setShowOverview] = useState(false)
  const [activeTab, setActiveTab] = useState('dash')

  const toggleLock = () => {
    setIsLocked(!isLocked)
    if (!isLocked) {
      recenterMap()
    }
  }

  const recenterMap = () => {
    if (map.current && userLocation) {
      map.current.easeTo({
        center: userLocation,
        zoom: 18,
        pitch: 60,
        bearing: map.current.getBearing(),
        duration: 1000,
      })
      setShowRecenterButton(false)
    }
  }

  const toggleOverview = () => {
    setShowOverview(!showOverview);
    
    if (map.current && directionsRef.current) {
      const waypoints = directionsRef.current.getWaypoints();
      
      if (waypoints.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        
        waypoints.forEach((waypoint: { coordinates: LngLatLike | LngLatBoundsLike }) => {
          bounds.extend(waypoint.coordinates);
        });
  
        map.current.fitBounds(bounds, { padding: 100, duration: 1000 });
      } else {
        console.warn('No waypoints found to display the route overview.');
        // Optionally recenter on user location or reset zoom
        if (userLocation) {
          map.current.easeTo({
            center: userLocation,
            zoom: 14, // Fallback zoom level
            duration: 1000,
          });
        }
      }
    }
  };
  
  
  useEffect(() => {
    console.log('Client: TrackingDriversPage mounted for driver', driverId);
    return () => {
      console.log('Client: TrackingDriversPage unmounted for driver', driverId);
    };
  }, [driverId]);

  // Start tracking GPS location
  useEffect(() => {
    if (isTracking && 'geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Client: GPS position - Latitude: ${latitude}, Longitude: ${longitude}`);

          // Save current location
          await saveCurrentLocation({ driverId, latitude, longitude });

          // Update viewState with new position
          setViewState({
            latitude,
            longitude,
            zoom: viewState.zoom,
          });

          // Update path coordinates
          setPathCoordinates((prevPath) => [...prevPath, { latitude, longitude }]);
        },
        (error) => {
          console.error('Client: Error fetching GPS location', error);
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [isTracking, driverId, viewState.zoom]);

  // Polling to check for assigned orders
  useEffect(() => {
    const orderPolling = setInterval(async () => {
      console.log('Client: Checking for assigned orders...');
      const { success, order } = await checkOrder({ driverId });
      if (success && order) {
        console.log(`Client: New order assigned - Order ID: ${order.id}, Status: ${order.status}`);
        setCurrentOrder(order);
      } else {
        console.log('Client: No new orders found');
      }
    }, 5000);

    return () => {
      console.log('Client: Stopping order polling');
      clearInterval(orderPolling);
    };
  }, [driverId]);

  // Accept the current order
  const handleAcceptOrder = async () => {
    if (currentOrder) {
      console.log('Client: Accepting order', currentOrder.id);
      await acceptOrder({ orderId: currentOrder.id, driverId });
      setCurrentOrder(null); // Clear current order after accepting
    }
  };
  const handleRejectOrder = () => setCurrentOrder(null);

  const updateUserLocation = (position: GeolocationPosition) => {
    const { longitude, latitude } = position.coords;
    setUserLocation([longitude, latitude]);
    if (map.current) {
      if (!userLocationMarker.current) {
        userLocationMarker.current = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map.current);
      } else {
        userLocationMarker.current.setLngLat([longitude, latitude]);
      }
      if (isNavigating && isCloseUpView) {
        // Update the map view without changing the zoom
        map.current.easeTo({
          center: [longitude, latitude],
          zoom: 18, // Keep the zoom level constant
          pitch: 60,
          bearing: map.current.getBearing(),
          duration: 1000,
        }, { animate: false });
      }
      // Update the route origin when the user's location changes
      if (directionsRef.current && selectedDestination) {
        directionsRef.current.setOrigin([longitude, latitude]);
      }
      // Check if user has arrived at destination
      if (selectedDestination) {
        const distance = turf.distance(
          turf.point([longitude, latitude]),
          turf.point(selectedDestination),
          { units: 'meters' }
        );
        if (distance < 50) { // Within 50 meters of destination
          endNavigation();
          setShowSuccessModal(true);
        }
      }
    }
  };

  const calculateRoute = (origin: [number, number], destination: [number, number]) => {
    if (directionsRef.current) {
      directionsRef.current.setOrigin(origin);
      directionsRef.current.setDestination(destination);
      
      // Listen for the 'route' event
      directionsRef.current.on('route', (e: { route: any[] }) => {
        if (e.route && e.route[0]) {
          const route = e.route[0];
          setRoute({
            duration: route.duration / 60, // Convert to minutes
            distance: route.distance * 0.000621371, // Convert to miles
            currentRoad: route.legs[0]?.steps[0]?.name || 'Unknown Road',
            nextExit: route.legs[0]?.steps[1]?.name || 'No exit',
          });
        }
      });
    }
  };
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
  const endNavigation = () => {
    setIsNavigating(false)
    setIsCloseUpView(false)
    setSelectedDestination(null)
    if (map.current && directionsRef.current) {
      directionsRef.current.removeRoutes()
      map.current.easeTo({ pitch: 0, zoom: 14 })
    }
    if (watchPositionId.current !== null) {
      navigator.geolocation.clearWatch(watchPositionId.current)
      watchPositionId.current = null
    }
  }

  const setDestination = (coordinates: [number, number]) => {
    setSelectedDestination(coordinates);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setUserLocation([longitude, latitude]);
          calculateRoute([longitude, latitude], coordinates);
        },
        (error) => console.error('Error getting current position:', error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const toggleView = () => {
    setIsCloseUpView(!isCloseUpView)
    if (map.current && userLocation) {
      map.current.easeTo({
        center: userLocation, // Make sure the map centers on the user
        zoom: isCloseUpView ? 14 : 18, // Switch between regular and close-up zoom
        pitch: isCloseUpView ? 0 : 60, // Adjust pitch for close-up view
        bearing: map.current.getBearing(), // Keep the current bearing
        duration: 1000, // Optional: Make the transition smoother
      })
    }
  }

  useEffect(() => {
    if (!mapContainer.current) return

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-84.3880, 33.7490], // Atlanta coordinates
      zoom: 14,
      pitch: 0,
    })

    // Add navigation control
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'imperial',
      profile: 'mapbox/driving',
      alternatives: true,
      geometries: 'geojson',
      controls: { instructions: false },
      flyTo: false,
    });
    
    directionsRef.current = directions;
    map.current.addControl(directions, 'top-left');


  // Add event listener for route updates
  directions.on('route', (e: { route: any[] }) => {
    if (e.route && e.route[0]) {
      const route = e.route[0];
      setRoute({
        duration: route.duration / 60,
        distance: route.distance * 0.000621371,
        currentRoad: route.legs[0]?.steps[0]?.name || 'Unknown Road',
        nextExit: route.legs[0]?.steps[1]?.name || 'No exit',
      });
    }
  });

  map.current.on('movestart', () => {
    if (isLocked && isNavigating) {
      setShowRecenterButton(true)
    }
  })

    // Clean up
    return () => {
      map.current?.remove()
      if (watchPositionId.current !== null) {
        navigator.geolocation.clearWatch(watchPositionId.current)
      }
    }
  }, [])

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] text-white">
    
   
   


    {/* Map Container */}
    <div className="flex-1 relative">
      <div ref={mapContainer} className="h-full" />
      
      {/* Gas Price Indicator */}
      <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur rounded-lg p-2 flex items-center gap-2">
        <Fuel className="w-4 h-4" />
        <span className="font-semibold">Gas</span>
      </div>

      

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
{/* Predefined Routes */}
<div className="absolute left-4 right-4 top-4 flex justify-center space-x-2">
        {predefinedRoutes.map((route) => (
          <Button
            key={route.name}
            onClick={() => setDestination(route.coordinates)}
            variant="secondary"
            className="bg-white/80 text-black hover:bg-white"
          >
            {route.name}
          </Button>
        ))}
      </div>
    {/* Location Card */}
    <div className="absolute bottom-20 left-4 right-4">

      <Card className="bg-black/90 backdrop-blur border-0">
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
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2">Location</h2>
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
