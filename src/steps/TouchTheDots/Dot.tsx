import { useState } from 'react';
import { getRandomNumber } from '../../utils';

interface DotProps {
  incrementTouchCount: () => void;
}

const Dot = ({ incrementTouchCount }: DotProps) => {
  const [touched, setTouched] = useState(false);

  const handleDotTouch = () => {
    if (!touched) {
      setTouched(true);
      incrementTouchCount();
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        top: `${getRandomNumber(0, 592)}px`,
        left: `${getRandomNumber(0, 400)}px`,
        ...baseDotStyles,
        ...(touched ? touchedDotStyles : untouchedDotStyles),
      }}
      onMouseEnter={handleDotTouch}
    />
  );
};

const baseDotStyles = {
  height: '3rem',
  width: '3rem',
  borderRadius: '50%',
};

const touchedDotStyles = {
  backgroundColor: 'green',
};

const untouchedDotStyles = {
  backgroundColor: 'grey',
};

export default Dot;
