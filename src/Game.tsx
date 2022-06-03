import './Game.css';
import { StepProvider } from './context/Step/StepProvider';

import StepPresenter from './steps/StepPresenter';
import { GameLoopProvider } from './context/GameLoop/GameLoopProvider';

const Game = () => {
  return (
    <div className="game-container">
      <GameLoopProvider>
        <StepProvider>
          <StepPresenter />
        </StepProvider>
      </GameLoopProvider>
    </div>
  );
};

export default Game;
