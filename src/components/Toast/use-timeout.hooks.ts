import React from 'react';

export default function useTimeout(callback: () => void, delay: number): React.MutableRefObject<number | null> {
  const timeoutRef = React.useRef<number | null>(null);
  const savedCallback = React.useRef(callback);
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  React.useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === 'number') {
      timeoutRef.current = window.setTimeout(tick, delay);
      return () => {
        if (timeoutRef.current !== null) {
          window.clearTimeout(timeoutRef.current);
        }
      };
    }
    return () => { };
  }, [delay]);
  return timeoutRef;
};
