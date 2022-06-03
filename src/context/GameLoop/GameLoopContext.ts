import { createContext } from 'react';

export interface LoopCallback {
  callback: () => void;
  dependencies?: any[];
}

interface GameLoopContextState {
  startGameLoop: () => void;
  stopGameLoop: () => void;
  addLoopCallbacks: (callbacks: LoopCallback[]) => void;
}

const GameLoopContext = createContext<GameLoopContextState>({} as GameLoopContextState);

export default GameLoopContext;
