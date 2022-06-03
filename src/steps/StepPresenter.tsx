import { useStepContext } from '../context/Step/StepProvider';

import { TouchTheDots, MoveTheDot } from '.';

const StepPresenter = () => {
  const { currentStep } = useStepContext();

  const steps = [<TouchTheDots />, <MoveTheDot />, <>Step3</>];

  return (
    <>
      {steps[currentStep]}
      <ResetGameButton />
    </>
  );
};

// Used for development
const ResetGameButton = () => {
  const { resetSteps } = useStepContext();

  return (
    <button style={{ position: 'absolute', top: 0, left: 0 }} onClick={resetSteps}>
      Reset game
    </button>
  );
};

export default StepPresenter;
