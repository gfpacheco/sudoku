import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export default function useCelebration(complete: boolean) {
  useEffect(() => {
    if (complete) {
      confetti();
    }
  }, [complete]);
}
