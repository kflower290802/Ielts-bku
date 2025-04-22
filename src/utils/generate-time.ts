import { ExamType } from '../exams/exams.type';

export const generateTimeByExamType = (type: ExamType): number => {
  const MINUTE_IN_MS = 60 * 1000;

  switch (type) {
    case ExamType.Listening:
      return 30 * MINUTE_IN_MS; // 30 minutes
    case ExamType.Reading:
      return 60 * MINUTE_IN_MS; // 60 minutes
    case ExamType.Writing:
      return 60 * MINUTE_IN_MS; // 60 minutes
    case ExamType.Speaking:
      return 14 * MINUTE_IN_MS; // 14 minutes
    default:
      return 0;
  }
};
