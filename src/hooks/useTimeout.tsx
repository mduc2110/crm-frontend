import { useCallback, useEffect, useRef } from "react";
// function useRef<T>(initialValue: T|null): RefObject<T>;
export default function useTimeout(callback: () => void, delay: number | undefined) {
   const callbackRef = useRef(callback);
   let timeoutRef = useRef<any>();

   useEffect(() => {
      callbackRef.current = callback;
   }, [callback]);

   const set = useCallback(() => {
      timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
   }, [delay]);

   const clear = useCallback(() => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
   }, []);

   useEffect(() => {
      set();
      return clear;
   }, [delay, set, clear]);

   const reset = useCallback(() => {
      clear();
      set();
   }, [clear, set]);

   return { reset, clear };
}

// import { useEffect, useLayoutEffect, useRef } from "react";

// function useTimeout(callback: () => void, delay: number | null) {
//    const savedCallback = useRef(callback);

//    // Remember the latest callback if it changes.
//    useLayoutEffect(() => {
//       savedCallback.current = callback;
//    }, [callback]);

//    // Set up the timeout.
//    useEffect(() => {
//       // Don't schedule if no delay is specified.
//       // Note: 0 is a valid value for delay.
//       if (!delay && delay !== 0) {
//          return;
//       }

//       const id = setTimeout(() => savedCallback.current(), delay);

//       return () => clearTimeout(id);
//    }, [delay]);
// }

// export default useTimeout;
