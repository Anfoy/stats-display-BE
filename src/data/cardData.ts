type CardData = {
  label: string;
  valueColor: string;
  description: string;
  className?: string;
};

/**
 * Information for each card
 */
export const cardData: Record<string, CardData> = {
  totalQuestions: {
    label: "Total Questions",
    valueColor: "#A5D6A7", //Default color; should be overridden by the accuracy color (brighter)
    description: "The total number of questions in the exam or assessment.",
  },
  totalAttempts: {
    label: "Total Attempts",
    valueColor: "#FFB347",
    description:
      "The sum of all attempts made across all questions. This includes both correct and incorrect attempts.",
  },
  correctAnswers: {
    label: "Correct Answers",
    valueColor: "#A5D6A7",
    description:
      "The number of questions that were eventually answered correctly, regardless of how many attempts it took.",
  },
  incorrectAnswers: {
    label: "Incorrect Answers",
    valueColor: "#FF5252",
    description:
      "The number of questions that were never answered correctly, even after multiple attempts.",
  },
  averageAttempts: {
    label: "Average Attempts",
    valueColor: "#36A2EB",
    description:
      "The average number of attempts per question, calculated by dividing total attempts by total questions.",
  },
  firstTryRate: {
    label: "First Try Success Rate",
    valueColor: "#FF6384",
    description:
      "The percentage of questions that were answered correctly on the first attempt.",
  },
  correctRate: {
    label: "Correct Rate",
    valueColor: "#A5D6A7",
    description:
      "The percentage of questions that were answered correctly, regardless of how many attempts it took.",
  },
  attemptDistribution: {
    label: "Attempt Distribution",
    valueColor: "#FFB347",
    description:
      "The distribution of attempts, calculated by dividing total attempts by total questions.",
  },
  attemptTypeStats: {
    label: "Attempt Type Stats",
    valueColor: "#A5D6A7",
    description: "The stats for the selected attempt type.",
  },
  totalIncorrectAttempts: {
    label: "Total Incorrect Attempts",
    valueColor: "#FF6B6B",
    description:
      "The total number of incorrect attempts made for the selected attempt type.",
  },
  oneAttempt: {
    label: "One Attempt",
    valueColor: "#A5D6A7",
    description:
      "The number of questions that were answered correctly with one attempt.",
    className: "attempt-distribution-card",
  },
  twoAttempts: {
    label: "Two Attempts",
    valueColor: "#FFB347",
    description:
      "The number of questions that were answered correctly with two attempts.",
    className: "attempt-distribution-card",
  },
  threeOrMoreAttempts: {
    label: "Three or More Attempts",
    valueColor: "#FF6B6B",
    description:
      "The number of questions that were answered correctly with three or more attempts.",
    className: "attempt-distribution-card",
  },
};
