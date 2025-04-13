import { PracticeType } from '../practices/pratices.type';

export function getIELTSBandScore(
  correctAnswers: number,
  type: PracticeType,
): number {
  const scoreTables: Record<
    string,
    { min: number; max: number; band: number }[]
  > = {
    listening: [
      { min: 39, max: 40, band: 9.0 },
      { min: 37, max: 38, band: 8.5 },
      { min: 35, max: 36, band: 8.0 },
      { min: 32, max: 34, band: 7.5 },
      { min: 30, max: 31, band: 7.0 },
      { min: 26, max: 29, band: 6.5 },
      { min: 23, max: 25, band: 6.0 },
      { min: 18, max: 22, band: 5.5 },
      { min: 16, max: 17, band: 5.0 },
      { min: 13, max: 15, band: 4.5 },
      { min: 10, max: 12, band: 4.0 },
      { min: 7, max: 9, band: 3.5 },
      { min: 5, max: 6, band: 3.0 },
      { min: 3, max: 4, band: 2.5 },
      { min: 1, max: 2, band: 2.0 },
      { min: 0, max: 0, band: 1.0 },
    ],
    reading: [
      { min: 39, max: 40, band: 9.0 },
      { min: 37, max: 38, band: 8.5 },
      { min: 35, max: 36, band: 8.0 },
      { min: 33, max: 34, band: 7.5 },
      { min: 30, max: 32, band: 7.0 },
      { min: 27, max: 29, band: 6.5 },
      { min: 23, max: 26, band: 6.0 },
      { min: 19, max: 22, band: 5.5 },
      { min: 15, max: 18, band: 5.0 },
      { min: 13, max: 14, band: 4.5 },
      { min: 10, max: 12, band: 4.0 },
      { min: 8, max: 9, band: 3.5 },
      { min: 6, max: 7, band: 3.0 },
      { min: 4, max: 5, band: 2.5 },
      { min: 2, max: 3, band: 2.0 },
      { min: 0, max: 1, band: 1.0 },
    ],
  };

  const table = scoreTables[type];
  for (const range of table) {
    if (correctAnswers >= range.min && correctAnswers <= range.max) {
      return range.band;
    }
  }

  throw new Error('Invalid input');
}
