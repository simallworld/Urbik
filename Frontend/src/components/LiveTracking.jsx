import React, { useState, useEffect, useCallback } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%'
}

const defaultCenter = {
    lat: 28.6139, // Delhi, India
    lng: 77.2090
}

const LiveTracking = () => {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    })

    const [currentPosition, setCurrentPosition] = useState(null)
    const [map, setMap] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [intervalId, setIntervalId] = useState(null)

    // Get user's current location
    const getCurrentLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by this browser.')
            setLoading(false)
            return
        }

        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                setCurrentPosition(pos)
                setLoading(false)
                setError(null)
            },
            (err) => {
                console.error('Error getting location:', err)
                setError('Unable to retrieve your location. Please enable location services.')
                setLoading(false)
            },
            options
        )
    }, [])

    // Start tracking location every 10 seconds
    const startLocationTracking = useCallback(() => {
        if (!navigator.geolocation) return;

        let isUserInteracting = false;

        if (map) {
            // Detect when the user starts dragging
            map.addListener("dragstart", () => {
                isUserInteracting = true;
            });

            // Optional: after drag ends, you can re-enable auto-follow after some delay
            map.addListener("dragend", () => {
                setTimeout(() => {
                    isUserInteracting = false;
                }, 10000); // resume following after 10 sec of no dragging
            });
        }

        const updateLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setCurrentPosition(pos);

                    // ✅ Only pan to position if the user is not dragging
                    if (map && !isUserInteracting) {
                        map.panTo(pos);
                    }
                },
                (err) => {
                    console.error("Error updating location:", err);
                },
                { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
            );
        };

        updateLocation();
        const id = setInterval(updateLocation, 10000);
        setIntervalId(id);
    }, [map]);


    // Stop tracking
    const stopLocationTracking = useCallback(() => {
        if (intervalId) {
            clearInterval(intervalId)
            setIntervalId(null)
        }
    }, [intervalId])

    // Init on mount
    useEffect(() => {
        getCurrentLocation()
        return () => stopLocationTracking()
    }, [getCurrentLocation, stopLocationTracking])

    // Start tracking when we have a position
    useEffect(() => {
        if (currentPosition && !intervalId) startLocationTracking()
    }, [currentPosition, intervalId, startLocationTracking])

    if (loadError) {
        return <p className="p-4 text-red-600">Error loading Google Maps.</p>
    }

    if (loading || !isLoaded) {
        return (
            <div className="h-full w-full flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Getting your location...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="h-full w-full flex items-center justify-center bg-gray-100">
                <div className="text-center p-6">
                    <div className="text-red-500 text-4xl mb-4">
                        <i className="ri-map-pin-line"></i>
                    </div>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={getCurrentLocation}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full w-full relative">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition || defaultCenter}
                zoom={15}
                onLoad={(map) => setMap(map)}
                onUnmount={() => setMap(null)}
                options={{
                    draggable: true,                // ✅ Allow dragging
                    gestureHandling: "greedy",      // ✅ Ensures touch drag works on mobile
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    styles: [
                        {
                            featureType: 'poi',
                            elementType: 'labels',
                            stylers: [{ visibility: 'off' }]
                        }
                    ]
                }}
            >
                {currentPosition && window.google && (
                    <Marker
                        position={currentPosition}
                        icon={{
                            url:
                                'data:image/svg+xml;charset=UTF-8,' +
                                encodeURIComponent(`
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="8" fill="#3B82F6" 
                                        stroke="#FFFFFF" stroke-width="3"/>
                                    <circle cx="12" cy="12" r="3" fill="#FFFFFF"/>
                                </svg>
                            `),
                            scaledSize: new window.google.maps.Size(24, 24),
                            anchor: new window.google.maps.Point(12, 12)
                        }}
                        title="Your current location"
                    />
                )}
            </GoogleMap>

            {/* Live indicator */}
            <div className="absolute top-4 right-14 bg-white rounded-full p-2 shadow-lg">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Live</span>
                </div>
            </div>

            {/* Center button */}
            <button
                onClick={() => {
                    if (currentPosition && map) {
                        map.panTo(currentPosition)
                        map.setZoom(15)
                    }
                }}
                className="absolute bottom-6 flex justify-center items-center w-9 h-9 right-14 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
                title="Center on my location"
            >
                <i className="ri-focus-3-line text-xl text-gray-700"></i>
            </button>
        </div>
    )
}

export default LiveTracking