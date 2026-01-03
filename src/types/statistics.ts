import { z } from "zod";

const QuestionStatsSchema = z.object({
  id: z.uuid().describe("The id of the question"),
  totalAttempts: z
    .number()
    .int()
    .min(0)
    .describe("The total number of attempts"),
  incorrectAttempts: z
    .number()
    .int()
    .min(0)
    .describe("The number of incorrect attempts"),
  firstTry: z
    .boolean()
    .describe("Whether the question was answered correctly on the first try"),
  correctlyAnswered: z
    .boolean()
    .describe("Whether the question was answered correctly"),
});

const AttemptDistributionSchema = z.object({
  oneAttempt: z
    .number()
    .int()
    .min(0)
    .describe("The number of attempts that took 1 attempt"),
  twoAttempts: z
    .number()
    .int()
    .min(0)
    .describe("The number of attempts that took 2 attempts"),
  threeOrMoreAttempts: z
    .number()
    .int()
    .min(0)
    .describe("The number of attempts that took 3 or more attempts"),
  oneAttemptPercent: z
    .number()
    .min(0)
    .max(100)
    .describe("The percentage of questions that took 1 attempt"),
  twoAttemptsPercent: z
    .number()
    .min(0)
    .max(100)
    .describe("The percentage of questions that took 2 attempts"),
  threeOrMorePercent: z
    .number()
    .min(0)
    .max(100)
    .describe("The percentage of questions that took 3 or more attempts"),
});

const OverallStatsSchema = z.object({
  totalQuestions: z
    .number()
    .int()
    .min(0)
    .describe("The total number of questions"),
  totalAttempts: z
    .number()
    .int()
    .min(0)
    .describe("The total number of attempts"),
  totalCorrectAttempts: z
    .number()
    .int()
    .min(0)
    .describe("The total number of correct attempts"),
  totalIncorrectAttempts: z
    .number()
    .int()
    .min(0)
    .describe("The total number of incorrect attempts"),
  totalFirstTryAnswers: z
    .number()
    .int()
    .min(0)
    .describe("The total number of correct attempts on the first try"),
  averageAttempts: z
    .number()
    .min(0)
    .describe("The average number of attempts per question"),
  correctAnswers: z
    .number()
    .int()
    .min(0)
    .describe("The total number of correct answers"),
  incorrectAnswers: z
    .number()
    .int()
    .min(0)
    .describe("The total number of incorrect answers"),
  firstTryRate: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "The percentage of questions answered correctly on the first try"
    ),
  correctRate: z
    .number()
    .min(0)
    .max(100)
    .describe("The percentage of questions answered correctly"),
  attemptDistribution: AttemptDistributionSchema.describe(
    "The distribution of attempts"
  ),
});

const CalculatedStatsSchema = z.object({
  overallStats: OverallStatsSchema.describe("The overall stats"),
  perQuestionStats: z
    .array(QuestionStatsSchema)
    .describe("The stats for each question"),
});

type QuestionStats = z.infer<typeof QuestionStatsSchema>;
type OverallStats = z.infer<typeof OverallStatsSchema>;
type AllCalculatedStats = z.infer<typeof CalculatedStatsSchema>;

export {
  QuestionStatsSchema,
  OverallStatsSchema,
  CalculatedStatsSchema,
  type QuestionStats,
  type OverallStats,
  type AllCalculatedStats,
};
