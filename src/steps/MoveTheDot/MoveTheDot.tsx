import { useEffect, useRef } from 'react';
import { useGameLoopContext } from '../../context/GameLoop/GameLoopProvider';
import useCollision from '../../hooks/useCollision';
import useMovement from '../../hooks/useMovement';

const MoveTheDot = () => {
  const { startGameLoop, addLoopCallbacks } = useGameLoopContext();
  const playerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  // useCollision('player-dot', 'dot-1', () => {
  //   console.log('COLLISION');
  // });

  useEffect(() => {
    startGameLoop();
    addLoopCallbacks([{ callback: () => console.log('callback1') }]);
  }, []);

  return (
    <div>
      <Dot id="player-dot" />
      <div
        id="dot-1"
        ref={dotRef}
        style={{
          height: '3rem',
          width: '3rem',
          borderRadius: '50%',
          backgroundColor: 'grey',
          position: 'relative',
          left: '50px',
          top: '0px',
        }}
      />
    </div>
  );
};

const Dot = ({ id }: { id: string }) => {
  const dotRef = useRef<HTMLDivElement>(null);
  // useMovement(dotRef.current as HTMLDivElement);
  const { addLoopCallbacks } = useGameLoopContext();

  useEffect(() => {
    addLoopCallbacks([{ callback: () => console.log('from the dott') }]);
  }, []);

  return (
    <div
      id={id}
      ref={dotRef}
      style={{
        height: '3rem',
        width: '3rem',
        borderRadius: '50%',
        backgroundColor: 'grey',
        position: 'relative',
        left: '100px',
        top: '100px',
      }}
    />
  );
};

export default MoveTheDot;
