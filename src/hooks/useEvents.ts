import { useEffect } from 'react';

interface Event {
  event: string;
  callback: (event: any) => void;
}

const useEvents = (events: Event[]) => {
  useEffect(() => {
    events.forEach(({ event, callback }) => {
      window.addEventListener(event, callback);
    });

    return () => {
      events.forEach(({ event, callback }) => {
        window.removeEventListener(event, callback);
      });
    };
  }, [events]);
};

export default useEvents;
