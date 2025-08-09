import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';

/**
 * SocketExample Component
 * Demonstrates how to use the SocketContext for sending and receiving messages
 */
const SocketExample = () => {
    const { 
        sendMessage, 
        receiveMessage, 
        joinRoom, 
        isConnected, 
        getConnectionStatus 
    } = useSocket();
    
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [eventName, setEventName] = useState('test-message');
    const [userId, setUserId] = useState('user123');
    const [userType, setUserType] = useState('user');

    // Example: Listen for messages when component mounts
    useEffect(() => {
        // Listen for test messages
        const cleanup1 = receiveMessage('test-message', (data) => {
            console.log('Received test message:', data);
            setReceivedMessages(prev => [...prev, {
                event: 'test-message',
                data: data,
                timestamp: new Date().toLocaleTimeString()
            }]);
        });

        // Listen for server responses
        const cleanup2 = receiveMessage('server-response', (data) => {
            console.log('Received server response:', data);
            setReceivedMessages(prev => [...prev, {
                event: 'server-response',
                data: data,
                timestamp: new Date().toLocaleTimeString()
            }]);
        });

        // Listen for errors
        const cleanup3 = receiveMessage('error', (error) => {
            console.error('Socket error received:', error);
            setReceivedMessages(prev => [...prev, {
                event: 'error',
                data: error,
                timestamp: new Date().toLocaleTimeString()
            }]);
        });

        // Cleanup listeners when component unmounts
        return () => {
            cleanup1();
            cleanup2();
            cleanup3();
        };
    }, [receiveMessage]);

    // Handle joining room
    const handleJoinRoom = () => {
        const success = joinRoom({ userId, userType });
        if (success) {
            setReceivedMessages(prev => [...prev, {
                event: 'system',
                data: `Joined room as ${userType} with ID: ${userId}`,
                timestamp: new Date().toLocaleTimeString()
            }]);
        }
    };

    // Handle sending message
    const handleSendMessage = () => {
        if (!message.trim() || !eventName.trim()) {
            alert('Please enter both message and event name');
            return;
        }

        const success = sendMessage(eventName, {
            message: message,
            sender: userId,
            timestamp: new Date().toISOString()
        });

        if (success) {
            setReceivedMessages(prev => [...prev, {
                event: 'sent',
                data: `Sent "${message}" to event "${eventName}"`,
                timestamp: new Date().toLocaleTimeString()
            }]);
            setMessage('');
        } else {
            alert('Failed to send message. Check connection.');
        }
    };

    // Handle sending location update (example for captain)
    const handleLocationUpdate = () => {
        if (userType === 'captain') {
            const mockLocation = {
                lat: 40.7128 + (Math.random() - 0.5) * 0.01,
                lng: -74.0060 + (Math.random() - 0.5) * 0.01
            };

            sendMessage('update-location-captain', {
                userId: userId,
                location: mockLocation
            });

            setReceivedMessages(prev => [...prev, {
                event: 'sent',
                data: `Location updated: ${mockLocation.lat.toFixed(4)}, ${mockLocation.lng.toFixed(4)}`,
                timestamp: new Date().toLocaleTimeString()
            }]);
        }
    };

    const connectionStatus = getConnectionStatus();

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Socket.IO Example</h2>
            
            {/* Connection Status */}
            <div className="mb-4 p-3 rounded-lg bg-gray-100">
                <h3 className="font-semibold mb-2">Connection Status:</h3>
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
                    {connectionStatus.socketId && (
                        <span className="text-sm text-gray-600">ID: {connectionStatus.socketId}</span>
                    )}
                </div>
                {connectionStatus.error && (
                    <div className="text-red-600 text-sm mt-1">Error: {connectionStatus.error}</div>
                )}
            </div>

            {/* User Configuration */}
            <div className="mb-4 p-3 rounded-lg bg-blue-50">
                <h3 className="font-semibold mb-2">User Configuration:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input
                        type="text"
                        placeholder="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="px-3 py-2 border rounded"
                    />
                    <select
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        className="px-3 py-2 border rounded"
                    >
                        <option value="user">User</option>
                        <option value="captain">Captain</option>
                    </select>
                    <button
                        onClick={handleJoinRoom}
                        disabled={!isConnected}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        Join Room
                    </button>
                </div>
            </div>

            {/* Message Sending */}
            <div className="mb-4 p-3 rounded-lg bg-green-50">
                <h3 className="font-semibold mb-2">Send Message:</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <input
                        type="text"
                        placeholder="Event name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        className="px-3 py-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="px-3 py-2 border rounded md:col-span-2"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!isConnected}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
                    >
                        Send
                    </button>
                </div>
            </div>

            {/* Special Actions */}
            {userType === 'captain' && (
                <div className="mb-4 p-3 rounded-lg bg-yellow-50">
                    <h3 className="font-semibold mb-2">Captain Actions:</h3>
                    <button
                        onClick={handleLocationUpdate}
                        disabled={!isConnected}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-400"
                    >
                        Update Location
                    </button>
                </div>
            )}

            {/* Received Messages */}
            <div className="mb-4">
                <h3 className="font-semibold mb-2">Messages Log:</h3>
                <div className="h-64 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                    {receivedMessages.length === 0 ? (
                        <p className="text-gray-500">No messages yet...</p>
                    ) : (
                        receivedMessages.map((msg, index) => (
                            <div key={index} className="mb-2 p-2 bg-white rounded border-l-4 border-blue-400">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="font-semibold text-blue-600">[{msg.event}]</span>
                                        <div className="text-sm text-gray-800">
                                            {typeof msg.data === 'object' ? JSON.stringify(msg.data, null, 2) : msg.data}
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500">{msg.timestamp}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <button
                    onClick={() => setReceivedMessages([])}
                    className="mt-2 px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                >
                    Clear Log
                </button>
            </div>

            {/* Usage Instructions */}
            <div className="p-3 rounded-lg bg-gray-100">
                <h3 className="font-semibold mb-2">Usage Instructions:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                    <li>1. Make sure the backend server is running on port 4000</li>
                    <li>2. Click "Join Room" to register with the server</li>
                    <li>3. Use "Send Message" to emit custom events</li>
                    <li>4. Try different event names like: test-message, custom-event, etc.</li>
                    <li>5. If you're a captain, use "Update Location" to send location data</li>
                </ul>
            </div>
        </div>
    );
};

export default SocketExample;