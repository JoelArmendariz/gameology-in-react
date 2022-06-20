import isEmpty from 'lodash/isEmpty';
import { useEffect, useState } from 'react';
import { removePxFromString } from '../utils/utils';

type CollisionElement = HTMLDivElement | null;

interface ElementPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

// Extract left and tops from the transform attribute
const getTransformOffsets = (transformString: string) => {
  const transformWithoutPx = removePxFromString(transformString);
  const leftParenIndex = transformWithoutPx.indexOf('(');
  const rightParenIndex = transformWithoutPx.indexOf(')');
  const commaIndex = transformWithoutPx.indexOf(',');
  const spaceIndex = transformWithoutPx.indexOf(' ');

  return {
    leftOffset: Number(transformWithoutPx.substring(leftParenIndex + 1, commaIndex)),
    topOffset: Number(transformWithoutPx.substring(spaceIndex + 1, rightParenIndex)),
  };
};

const getMutationFunction =
  (initialPosition: ElementPosition, setPosition: (position: ElementPosition) => void) =>
  ([mutation]: any) => {
    // @ts-ignore
    const { transform } = mutation?.target?.style || {};
    const { topOffset, leftOffset } = getTransformOffsets(transform);
    setPosition({
      ...initialPosition,
      top: initialPosition.top + topOffset,
      left: initialPosition.left + leftOffset,
    });
  };

const useCollision = (
  element1: CollisionElement,
  element2: CollisionElement,
  callback: () => void
) => {
  const [collided, setCollided] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [initialElement1Position, setInitialElement1Position] = useState<ElementPosition>(
    {} as ElementPosition
  );
  const [initialElement2Position, setInitialElement2Position] = useState<ElementPosition>(
    {} as ElementPosition
  );
  const [element1Position, setElement1Position] = useState<ElementPosition>({} as ElementPosition);
  const [element2Position, setElement2Position] = useState<ElementPosition>({} as ElementPosition);

  useEffect(() => {
    if (element1 && element2 && !initialized) {
      setInitialized(true);
      const {
        top: top1,
        left: left1,
        width: width1,
        height: height1,
      } = element1?.getBoundingClientRect() || {};
      const {
        top: top2,
        left: left2,
        width: width2,
        height: height2,
      } = element2?.getBoundingClientRect() || {};
      setInitialElement1Position({ top: top1, left: left1, width: width1, height: height1 });
      setInitialElement2Position({ top: top2, left: left2, width: width2, height: height2 });
    }
  }, [element1, element2]);

  // Initialize element positions
  useEffect(() => {
    if (element1 && element2 && initialElement1Position && initialElement2Position) {
      if (isEmpty(element1Position)) {
        setElement1Position(initialElement1Position);
      }
      if (isEmpty(element2Position)) {
        setElement2Position(initialElement2Position);
      }
      const observerOptions = { attributes: true, attributeFilter: ['style'] };

      const element1Observer = new MutationObserver(
        getMutationFunction(initialElement1Position, setElement1Position)
      );
      const element2Observer = new MutationObserver(
        getMutationFunction(initialElement2Position, setElement2Position)
      );

      element1Observer.observe(element1, observerOptions);
      element2Observer.observe(element2, observerOptions);

      return () => {
        element1Observer.disconnect();
        element2Observer.disconnect();
      };
    }
  }, [element1, element2, initialElement1Position, initialElement2Position]);

  useEffect(() => {
    if (element1Position && element2Position && !collided) {
      const element1Bounds = {
        right: element1Position.left + element1Position.width,
        left: element1Position.left,
        top: element1Position.top,
        bottom: element1Position.top + element1Position.height,
      };
      const element2Bounds = {
        right: element2Position.left + element2Position.width,
        left: element2Position.left,
        top: element2Position.top,
        bottom: element2Position.top + element2Position.height,
      };
      if (
        (element1Bounds.left <= element2Bounds.right &&
          element1Bounds.top <= element2Bounds.bottom &&
          element1Bounds.bottom >= element2Bounds.top &&
          element1Bounds.left >= element2Bounds.left) ||
        (element1Bounds.right >= element2Bounds.left &&
          element1Bounds.top <= element2Bounds.bottom &&
          element1Bounds.bottom >= element2Bounds.top &&
          element1Bounds.right <= element2Bounds.right) ||
        (element1Bounds.top <= element2Bounds.bottom &&
          element1Bounds.top >= element2Bounds.top &&
          element1Bounds.left <= element2Bounds.right &&
          element1Bounds.right >= element2Bounds.left) ||
        (element1Bounds.bottom >= element2Bounds.top &&
          element1Bounds.bottom <= element2Bounds.bottom &&
          element1Bounds.left <= element2Bounds.right &&
          element1Bounds.right >= element2Bounds.left)
      ) {
        setCollided(true);
        callback();
      }
    }
  }, [element1Position, element2Position, collided]);
};

export default useCollision;
