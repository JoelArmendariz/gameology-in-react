import { useRef, useEffect } from 'react';

const useAnimationFrame = (
  callback: (time: number) => void,
  dependencies: any[] = [],
  shouldAnimate: boolean = true
) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef();

  useEffect(() => {
    const animate = (time: any) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      if (shouldAnimate) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current as number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useAnimationFrame;
