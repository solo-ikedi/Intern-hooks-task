import { useState, useEffect, useDebugValue } from 'react';

export function useFriendStatus(friendId) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    // Fake API call or subscription
    const timer = setTimeout(() => {
      setIsOnline(Math.random() > 0.5); // Random online/offline
    }, 1000);

    return () => clearTimeout(timer);
  }, [friendId]);

  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}
