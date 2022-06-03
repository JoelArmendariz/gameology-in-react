import { useContext, useState } from 'react';
import StepContext from './StepContext';

interface StepProviderProps {
  children: JSX.Element;
}

export const StepProvider = ({ children }: StepProviderProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const forceCurrentStep = setCurrentStep;

  const resetSteps = () => setCurrentStep(0);

  const nextStep = () => setCurrentStep(prevStep => prevStep + 1);

  const stepContext = {
    currentStep,
    nextStep,
    forceCurrentStep,
    resetSteps,
  };
  return <StepContext.Provider value={stepContext}>{children}</StepContext.Provider>;
};

export const useStepContext = () => useContext(StepContext);
