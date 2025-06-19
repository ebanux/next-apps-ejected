import { useState, useEffect } from 'react';

function useCustomRemoteHook(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    console.log('some custom hook');
  }, []);

  const checkoutUrl =
    process.env.NEXT_PUBLIC_CHECKOUT_URL || 'http://localhost:3002';
  return `Custom hook from ${checkoutUrl} works!`;
}
export default useCustomRemoteHook;
