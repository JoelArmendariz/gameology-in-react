import { useEffect, useState } from 'react';
import { useStepContext } from '../context/Step/StepProvider';

const useProceedOnCondition = (condition: boolean) => {
  const { nextStep } = useStepContext();

  useEffect(() => {
    if (condition) {
      nextStep();
    }
  }, [condition, nextStep]);
};

export default useProceedOnCondition;
