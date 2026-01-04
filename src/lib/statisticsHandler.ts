import { SubmissionStructure, Statistics } from "../types/index";

function formatAttemptTypeName(type: string): string {
  //AI assisted
  return type
    .split(/[_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Map of attempt types to their display names (key: attempt type, value: display name)
 * @param submission submission data
 * @returns Map of attempt types to their display names
 */
export function getAttemptTypes(
  //Ai assisted
  submission: SubmissionStructure.Submission
): Map<string, string> {
  const attemptTypes = new Set<string>();
  for (const question of Object.values(submission)) {
    for (const attempt of question.attempts) {
      attemptTypes.add(attempt.type);
    }
  }

  const sortedTypes = Array.from(attemptTypes).sort();
  return new Map(
    sortedTypes.map((type) => [type, formatAttemptTypeName(type)])
  );
}

export function calculateStats(
  submission: SubmissionStructure.Submission,
  attemptType: string | null
): Statistics.AllCalculatedStats {
  const perQuestionStats = calculatePerQuestionStats(submission, attemptType);

  const overallStats = calculateOverallStats(perQuestionStats);

  return {
    overallStats,
    perQuestionStats,
  };
}

function calculatePerQuestionStats(
  submission: SubmissionStructure.Submission,
  attemptType: string | null
): Statistics.QuestionStats[] {
  return Object.entries(submission).map(([questionId, question]) => {
    const attempts = attemptType
      ? question.attempts.filter((attempt) => attempt.type === attemptType)
      : question.attempts;

    const totalAttempts = attempts.length;
    const correctAttempts = attempts.filter(
      (attempt) => attempt.correct
    ).length;
    const incorrectAttempts = totalAttempts - correctAttempts;
    const firstTry = totalAttempts === 1 && attempts[0]?.correct === true;
    const correctlyAnswered = correctAttempts > 0;

    return {
      id: questionId,
      totalAttempts,
      incorrectAttempts,
      firstTry,
      correctlyAnswered,
    };
  });
}

function calculateOverallStats(
  perQuestionStats: Statistics.QuestionStats[]
): Statistics.OverallStats {
  const totalQuestions = perQuestionStats.length;

  if (totalQuestions === 0) {
    return {
      totalQuestions: 0,
      totalAttempts: 0,
      totalCorrectAttempts: 0,
      totalIncorrectAttempts: 0,
      totalFirstTryAnswers: 0,
      averageAttempts: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      firstTryRate: 0,
      correctRate: 0,
      attemptDistribution: {
        oneAttempt: 0,
        twoAttempts: 0,
        threeOrMoreAttempts: 0,
        oneAttemptPercent: 0,
        twoAttemptsPercent: 0,
        threeOrMorePercent: 0,
      },
    };
  }

  let totalAttempts = 0;
  let totalIncorrectAttempts = 0;
  let totalFirstTryAnswers = 0;
  let correctAnswers = 0;
  const attemptDistribution = {
    oneAttempt: 0,
    twoAttempts: 0,
    threeOrMoreAttempts: 0,
  };

  for (const questionStat of perQuestionStats) {
    totalAttempts += questionStat.totalAttempts;
    totalIncorrectAttempts += questionStat.incorrectAttempts;

    if (questionStat.firstTry) totalFirstTryAnswers++;
    if (questionStat.correctlyAnswered) correctAnswers++;

    const attemptCount = questionStat.totalAttempts;
    if (attemptCount === 1) {
      attemptDistribution.oneAttempt++;
    } else if (attemptCount === 2) {
      attemptDistribution.twoAttempts++;
    } else {
      attemptDistribution.threeOrMoreAttempts++;
    }
  }

  const incorrectAnswers = totalQuestions - correctAnswers;
  const averageAttempts = totalAttempts / totalQuestions;
  const firstTryRate = (totalFirstTryAnswers / totalQuestions) * 100;
  const correctRate = (correctAnswers / totalQuestions) * 100;

  return {
    totalQuestions,
    totalAttempts,
    totalCorrectAttempts: correctAnswers,
    totalIncorrectAttempts,
    totalFirstTryAnswers,
    averageAttempts,
    correctAnswers,
    incorrectAnswers,
    firstTryRate,
    correctRate,
    attemptDistribution: {
      ...attemptDistribution,
      oneAttemptPercent:
        (attemptDistribution.oneAttempt / totalQuestions) * 100,
      twoAttemptsPercent:
        (attemptDistribution.twoAttempts / totalQuestions) * 100,
      threeOrMorePercent:
        (attemptDistribution.threeOrMoreAttempts / totalQuestions) * 100,
    },
  };
}

const ACCURACY_COLORS = [
  { threshold: 90, color: "#1B5E20" }, // Darkest green - excellent
  { threshold: 80, color: "#2E7D32" }, // Very dark green - very good
  { threshold: 70, color: "#388E3C" }, // Dark green - good
  { threshold: 60, color: "#43A047" }, // Medium-dark green - above average
  { threshold: 50, color: "#4CAF50" }, // Medium green - average
  { threshold: 40, color: "#66BB6A" }, // Medium-light green - below average
  { threshold: 30, color: "#81C784" }, // Light green - poor
  { threshold: 20, color: "#A5D6A7" }, // Lighter green - very poor
  { threshold: 10, color: "#C8E6C9" }, // Very light green - very low
  { threshold: 0, color: "#E8F5E9" }, // Lightest green - extremely low
] as const;

export function getAccuracyColor(correctRate: number): string {
  //AI assisted
  return (
    ACCURACY_COLORS.find(({ threshold }) => correctRate >= threshold)?.color ??
    ACCURACY_COLORS[ACCURACY_COLORS.length - 1].color
  );
}
