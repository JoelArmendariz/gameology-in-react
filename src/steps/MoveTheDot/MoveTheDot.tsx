import { useRef, forwardRef, useState } from 'react';
import useCollision from '../../hooks/useCollision';
import useMovement from '../../hooks/useMovement';

const MoveTheDot = () => {
  const [playerDotSize, setPlayerDotSize] = useState(5);
  const playerDotRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  useMovement(playerDotRef.current);
  useCollision(playerDotRef.current, dotRef.current, () => {
    setPlayerDotSize(playerDotSize * 2);
  });

  return (
    <div>
      <Dot size={playerDotSize} ref={playerDotRef} />
      <div
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

const Dot = forwardRef(({ size }: { size: number }, ref: any) => {
  return (
    <div
      ref={ref}
      style={{
        height: `${size}rem`,
        width: `${size}rem`,
        borderRadius: '50%',
        backgroundColor: 'grey',
        position: 'relative',
        left: '100px',
        top: '100px',
      }}
    />
  );
});

export default MoveTheDot;
