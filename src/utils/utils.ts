export const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);

export const setLocalStorage = (key: string, value: any): void => localStorage.setItem(key, value);

export const getLocalStorage = (key: string): any => localStorage.getItem(key);
