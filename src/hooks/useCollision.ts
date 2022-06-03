import { useEffect, useState } from 'react';
import useAnimationFrame from './useAnimationFrame';

const useCollision = (id1: string, id2: string, callback: () => void) => {
  const [collided, setCollided] = useState(false);
  const [element1Rect, setElement1Rect] = useState<DOMRect>();
  const [element2Rect, setElement2Rect] = useState<DOMRect>();

  useAnimationFrame(() => {
    const element1 = document.getElementById(id1);
    const element2 = document.getElementById(id2);
    setElement1Rect(element1?.getBoundingClientRect());
    setElement2Rect(element2?.getBoundingClientRect());
  });

  useEffect(() => {
    if (element1Rect && element2Rect && !collided) {
      if (
        (element1Rect.x + element1Rect.width >= element2Rect.x &&
          element1Rect.x + element1Rect.width <= element2Rect.x + element2Rect.width) ||
        (element1Rect.x >= element2Rect.x &&
          element1Rect.x <= element2Rect.x + element2Rect.width) ||
        (element1Rect.y + element1Rect.width >= element2Rect.y &&
          element1Rect.y + element1Rect.width <= element2Rect.y + element2Rect.width) ||
        (element1Rect.y >= element2Rect.y && element1Rect.y <= element2Rect.y + element2Rect.width)
      ) {
        setCollided(true);
        callback();
      }
    }
  }, [callback, element1Rect, element2Rect, collided]);
};

export default useCollision;
