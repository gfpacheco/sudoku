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

export default function useAnnotation(
  setRaw: React.Dispatch<React.SetStateAction<CellState[]>>,
) {
  const [currentAnnotationType, setCurrentAnnotationType] =
    useState<AnnotationType>(AnnotationType.normal);

  function annotate(value: number) {
    setRaw(prev => {
      const updateSpec: Spec<CellState[]> = {};

      prev.forEach(({ selected, annotations }, index) => {
        if (!selected) {
          return;
        }

        if (currentAnnotationType === AnnotationType.normal) {
          updateSpec[index] = {
            value: { $set: value },
            annotations: { $set: { corner: [], center: [] } },
          };
        } else {
          const existingAnnotationIndex =
            annotations[currentAnnotationType].indexOf(value);

          if (existingAnnotationIndex === -1) {
            updateSpec[index] = {
              annotations: {
                [currentAnnotationType]: {
                  $push: [value],
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

  return {
    currentAnnotationType,
    setCurrentAnnotationType,
    annotate,
  };
}
