import { useState } from 'react';
import useProceedOnCondition from '../../hooks/useProceedOnCondition';

import Dot from './Dot';

const DotCount = 5;

const TouchTheDots = () => {
  const [touchedCount, setTouchedCount] = useState(0);

  useProceedOnCondition(touchedCount === DotCount);

  const incrementTouchCount = () => setTouchedCount(prevCount => prevCount + 1);

  return (
    <div style={styles}>
      {Array(DotCount).fill(<Dot incrementTouchCount={incrementTouchCount} />)}
    </div>
  );
};

const styles = {
  display: 'flex',
  height: '100%',
};

export default TouchTheDots;
