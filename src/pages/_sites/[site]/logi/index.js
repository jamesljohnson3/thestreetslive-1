import React, { useState } from 'react'
import { Toaster, toast } from 'sonner'

const authorizationKey = process.env.NOW_PUBLIC_API_KEY || '22-22-22'
const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

const SamplePage = () => {
    const [showVerifyOtpForm, setShowVerifyOtpForm] = useState(false)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [verificationResult, setVerificationResult] = useState(null)
    const [showPasswordForm, setShowPasswordForm] = useState(false)
    const [password, setPassword] = useState('')
    const [isOtpVerified, setIsOtpVerified] = useState(false)
    const [isOtpSent, setIsOtpSent] = useState(false)

    const handleContinue = () => {
        if (email) {
            setIsOtpSent(false)
            setShowVerifyOtpForm(true)
        } else {
            toast('Please enter your email', { position: 'top-right', type: 'error' })
        }
    }

    const handleSendOtp = async () => {
        if (email) {
            try {
                const apiEndpoint =
                    'https://starter-nestjs-dev-cszb.4.us-1.fl0.io/otp/generate'

                const payload = {
                    email: email,
                    field1: currentUrl,
                }

                const headers = {
                    Authorization: `Bearer ${authorizationKey}`,
                    'Content-Type': 'application/json',
                }

                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(payload),
                })

                if (response.ok) {
                    toast('OTP Code sent successfully', { position: 'top-right' })
                    setIsOtpSent(true)
                } else {
                    const errorData = await response.json()
                    console.error('Error:', errorData.message)
                }
            } catch (error) {
                console.error('Error:', error)
            }
        } else {
            toast('Please enter your email before sending OTP', {
                position: 'top-right',
                type: 'error',
            })
        }
    }

    const handleVerifyOtp = async () => {
        console.log('Verifying OTP...')

        const apiEndpoint =
            'https://starter-nestjs-dev-cszb.4.us-1.fl0.io/otp/verify'

        const payload = {
            otp: otp,
            email: email,
            field2: currentUrl,
        }

        const headers = {
            Authorization: `Bearer ${authorizationKey}`,
            'Content-Type': 'application/json',
        }

        try {
            const apiResponse = await fetch(apiEndpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload),
            })

            if (apiResponse.ok) {
                const responseData = await apiResponse.json()
                setVerificationResult(responseData)
                if (responseData.success) {
                    setIsOtpVerified(true)
                    setShowPasswordForm(true)
                    toast('OTP Verified successfully', { position: 'top-right' })
                } else {
                    setIsOtpVerified(false)
                    setShowPasswordForm(false)
                    toast('OTP Verification failed', {
                        position: 'top-right',
                        type: 'error',
                    })
                }
            } else {
                console.error('Error:', apiResponse.statusText)
                setIsOtpVerified(false)
                setShowPasswordForm(false)
            }
        } catch (error) {
            console.error('Error:', error)
            setIsOtpVerified(false)
            setShowPasswordForm(false)
        }
    }

    const handleResendCode = async () => {
        if (email) {
            try {
                const apiEndpoint =
                    'https://starter-nestjs-dev-cszb.4.us-1.fl0.io/otp/generate'

                const payload = {
                    email: email,
                    field1: currentUrl,
                }

                const headers = {
                    Authorization: `Bearer ${authorizationKey}`,
                    'Content-Type': 'application/json',
                }

                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(payload),
                })

                if (response.ok) {
                    toast('OTP Code resent successfully', { position: 'top-right' })
                    setOtp('')
                    setIsOtpSent(true)
                } else {
                    const errorData = await response.json()
                    console.error('Error:', errorData.message)
                }
            } catch (error) {
                console.error('Error:', error)
            }
        } else {
            toast('Please enter your email before resending OTP', {
                position: 'top-right',
                type: 'error',
            })
        }
    }

    const handlePasswordSubmission = async () => {
        // Handle password submission logic, e.g., send password to backend

        // Perform any necessary actions after successful password submission
        console.log('Password submission successful.')
        // For example, you can redirect the user to a dashboard or authenticated page
    }

    return (
        <div>
            <Toaster expand={true} />
            <h1>Login OTP Page</h1>
            {showPasswordForm ? (
                <div>
                    <h2>Set Password</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handlePasswordSubmission}>Submit Password</button>
                </div>
            ) : (
                <div>
                    <h2>Submit Email Form</h2>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={handleContinue}>Continue</button>
                </div>
            )}
            {showVerifyOtpForm && (
                <div>
                    <h2>Verify OTP Form</h2>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    {isOtpSent && (
                        <>
                            <button onClick={handleVerifyOtp}>Verify OTP</button>
                            <button onClick={handleResendCode}>Resend Code</button>
                        </>
                    )}
                    {!isOtpSent && <button onClick={handleSendOtp}>Send Code</button>}
                    {verificationResult && <div>{verificationResult.message}</div>}
                </div>
            )}
        </div>
    )
}

export default SamplePage