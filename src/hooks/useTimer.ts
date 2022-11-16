import update from 'immutability-helper';
import { useCallback, useEffect } from 'react';

import formatTime from '../lib/formatTime';
import usePersistentState from './usePersistentState';

export interface Timer {
  seconds: number;
  bestSeconds?: number;
}

export type UseTimerReturn = ReturnType<typeof useTimer>;

export default function useTimer(complete: boolean) {
  const [timer, setTimer] = usePersistentState<Timer>({ seconds: 0 }, 'timer');

  useEffect(() => {
    if (complete) {
      setTimer(prev =>
        update(prev, {
          bestSeconds: {
            $set: prev.bestSeconds
              ? Math.min(prev.bestSeconds, prev.seconds)
              : prev.seconds,
          },
        }),
      );
    } else {
      const interval = setInterval(() => {
        setTimer(prev =>
          document.hasFocus()
            ? update(prev, { seconds: { $set: prev.seconds + 1 } })
            : prev,
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [complete, setTimer]);

  const resetTimer = useCallback(() => {
    setTimer(prev => update(prev, { seconds: { $set: 0 } }));
  }, [setTimer]);

  return {
    time: formatTime(timer.seconds),
    bestTime: formatTime(timer.bestSeconds),
    resetTimer,
  };
}
