import { createContext } from 'react';

interface StepContextState {
  currentStep: number;
  forceCurrentStep: (stepNumber: number) => void;
  resetSteps: () => void;
  nextStep: () => void;
}

const StepContext = createContext<StepContextState>({} as StepContextState);

export default StepContext;
