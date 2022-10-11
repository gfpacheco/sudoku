import update, { Spec } from 'immutability-helper';
import { useCallback, useState } from 'react';

import forRelatedCells from '../lib/forRelatedCells';
import { CellState } from './useGameState';

export enum AnnotationType {
  normal = 'normal',
  corner = 'corner',
  center = 'center',
}

export const allAnnotationTypes = Object.keys(
  AnnotationType,
) as AnnotationType[];

export type UseAnnotationReturn = ReturnType<typeof useAnnotation>;

export default function useAnnotation(
  setRaw: React.Dispatch<React.SetStateAction<CellState[]>>,
  recentValueRef: React.MutableRefObject<number | null>,
) {
  const [currentAnnotationType, setCurrentAnnotationType] =
    useState<AnnotationType>(AnnotationType.normal);

  const annotate = useCallback(
    (newValue: number) => {
      recentValueRef.current = newValue;
      setRaw(prev => {
        const updateSpec: Spec<CellState[]> = {};

        prev.forEach(({ value, fixed, selected, annotations }, index) => {
          if (fixed || !selected) {
            return;
          }

          if (currentAnnotationType === AnnotationType.normal) {
            updateSpec[index] = {
              value: { $set: newValue },
              annotations: { $set: { corner: [], center: [] } },
            };

            forRelatedCells(index, cellIndex => {
              const { corner, center } = prev[cellIndex].annotations;

              if (corner.includes(newValue) || center.includes(newValue)) {
                updateSpec[cellIndex] = {
                  annotations: {
                    $set: {
                      corner: corner.filter(v => v !== newValue),
                      center: center.filter(v => v !== newValue),
                    },
                  },
                };
              }
            });
          } else if (value) {
            return;
          } else {
            const existingAnnotationIndex =
              annotations[currentAnnotationType].indexOf(newValue);

            if (existingAnnotationIndex === -1) {
              updateSpec[index] = {
                annotations: {
                  [currentAnnotationType]: {
                    $push: [newValue],
                  },
                },
              };
            } else {
              updateSpec[index] = {
                annotations: {
                  [currentAnnotationType]: {
                    $splice: [[existingAnnotationIndex, 1]],
                  },
                },
              };
            }
          }
        });

        if (Object.keys(updateSpec).length === 0) {
          return prev;
        }

        return update(prev, updateSpec);
      });
    },
    [currentAnnotationType, recentValueRef, setRaw],
  );

  const clearCell = useCallback(() => {
    setRaw(prev => {
      const updateSpec: Spec<CellState[]> = {};

      prev.forEach(({ fixed, selected }, index) => {
        if (fixed || !selected) {
          return;
        }

        updateSpec[index] = {
          annotations: { $set: { corner: [], center: [] } },
          value: { $set: 0 },
        };
      });

      if (Object.keys(updateSpec).length === 0) {
        return prev;
      }

      return update(prev, updateSpec);
    });
  }, [setRaw]);

  return {
    currentAnnotationType,
    setCurrentAnnotationType,
    annotate,
    clearCell,
  };
}
