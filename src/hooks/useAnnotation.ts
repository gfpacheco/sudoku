import update, { Spec } from 'immutability-helper';
import { useState } from 'react';

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
) {
  const [currentAnnotationType, setCurrentAnnotationType] =
    useState<AnnotationType>(AnnotationType.normal);

  function annotate(newValue: number) {
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
  }

  function clearAnnotation() {
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
  }

  return {
    currentAnnotationType,
    setCurrentAnnotationType,
    annotate,
    clearAnnotation,
  };
}
