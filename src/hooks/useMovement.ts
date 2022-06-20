import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import useAnimationFrame from './useAnimationFrame';
import useEvents from './useEvents';

enum Arrows {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
}

const MOVEMENT_SPEED = 5;

// Takes an element ref and applies Arrow movement to it
const useMovement = (element: HTMLDivElement | null) => {
  const [keyDowns, setKeydowns] = useState<string[]>([]);
  const [currentDirection, setCurrentDirection] = useState('');

  const position = useRef({ x: 0, y: 0 });

  useEvents([
    {
      event: 'keydown',
      callback: ({ key }: KeyboardEvent) => {
        if (keyDowns.includes(key)) {
          return;
        }
        if (key in Arrows) {
          setCurrentDirection(key);
          setKeydowns([key, ...keyDowns]);
        }
      },
    },
    {
      event: 'keyup',
      callback: ({ key }: KeyboardEvent) => {
        if (key in Arrows && keyDowns.includes(key)) {
          setKeydowns(keyDowns.filter(keyDown => keyDown !== key));
        }
      },
    },
  ]);

  useEffect(() => {
    setCurrentDirection(keyDowns[0]);
  }, [keyDowns.length]);

  useAnimationFrame(() => {
    switch (currentDirection) {
      case Arrows.ArrowUp:
        position.current.y = position.current.y - MOVEMENT_SPEED;
        break;
      case Arrows.ArrowDown:
        position.current.y = position.current.y + MOVEMENT_SPEED;
        break;
      case Arrows.ArrowLeft:
        position.current.x = position.current.x - MOVEMENT_SPEED;
        break;
      case Arrows.ArrowRight:
        position.current.x = position.current.x + MOVEMENT_SPEED;
        break;
    }
    if (element) {
      element.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
    }
  }, [currentDirection]);

  return position.current;
};

export default useMovement;
