import { useRef } from 'react';

import useDocumentListener from './useDocumentListener';
import { UseGameHistoryReturn } from './useGameHistory';

export default function useGameGestures({ undo, redo }: UseGameHistoryReturn) {
  const startPointRef = useRef({ x: 0, y: 0 });
  const deltaPointRef = useRef({ x: 0, y: 0 });

  useDocumentListener('touchstart', event => {
    const touch = (event as TouchEvent).touches[0];
    startPointRef.current = { x: touch.clientX, y: touch.clientY };
    deltaPointRef.current = { x: 0, y: 0 };
  });

  useDocumentListener('touchmove', event => {
    const touch = (event as TouchEvent).touches[0];
    deltaPointRef.current = {
      x: touch.clientX - startPointRef.current.x,
      y: touch.clientY - startPointRef.current.y,
    };
  });

  useDocumentListener('touchend', () => {
    const { x, y } = deltaPointRef.current;

    if (y / x > 1) {
      // too vertical, probably not a swipe
      return;
    }

    if (Math.abs(x) < 50) {
      // too short, probably not a swipe
      return;
    }

    if (x > 0) {
      redo();
    } else {
      undo();
    }
  });
}
