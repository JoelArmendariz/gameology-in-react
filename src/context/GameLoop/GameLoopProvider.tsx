import { useContext, useState } from 'react';
import useAnimationFrame from '../../hooks/useAnimationFrame';
import GameLoopContext, { LoopCallback } from './GameLoopContext';

interface GameLoopProviderProps {
  children: JSX.Element;
}

export const GameLoopProvider = ({ children }: GameLoopProviderProps) => {
  const [shouldLoop, setShouldLoop] = useState(false);
  const [loopCallbacks, setLoopCallbacks] = useState<(() => void)[]>([]);
  const [loopDependencies, setLoopDependencies] = useState([shouldLoop]);

  const startGameLoop = () => setShouldLoop(true);

  const stopGameLoop = () => setShouldLoop(false);

  const addLoopCallbacks = (callbacks: LoopCallback[]) => {
    const callbacksWithoutDeps = callbacks.map(({ callback }) => callback);
    const dependenciesWithoutCallbacks = callbacks.map(({ dependencies }) => dependencies).flat();

    setLoopCallbacks(prevCallbacks => prevCallbacks.concat(callbacksWithoutDeps));
    setLoopDependencies(prevDependencies => prevDependencies.concat(dependenciesWithoutCallbacks));
  };

  useAnimationFrame(
    () => {
      loopCallbacks.forEach(callback => {
        callback();
      });
    },
    [shouldLoop],
    shouldLoop
  );

  const gameLoopContext = {
    startGameLoop,
    stopGameLoop,
    addLoopCallbacks,
  };

  return <GameLoopContext.Provider value={gameLoopContext}>{children}</GameLoopContext.Provider>;
};

export const useGameLoopContext = () => useContext(GameLoopContext);
