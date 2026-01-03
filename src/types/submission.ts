import { z } from "zod";

const AttemptSchema = z.object({
  id: z.uuid().describe("The id of the attempt"),
  correct: z.boolean().describe("Whether the attempt is correct"),
  userSolution: z
    .array(z.number().int().min(0).max(4))
    .describe("The user's solution"),
  type: z.string().describe("The type of the attempt"),
});

const QuestionSchema = z.object({
  attempts: z.array(AttemptSchema).describe("The attempts for the question"),
});

const SubmissionSchema = z
  .record(z.uuid().describe("The id of the question"), QuestionSchema)
  .describe("The questions in the submission");

type Attempt = z.infer<typeof AttemptSchema>;
type Question = z.infer<typeof QuestionSchema>;
type Submission = z.infer<typeof SubmissionSchema>;

export {
  AttemptSchema,
  QuestionSchema,
  SubmissionSchema,
  type Attempt,
  type Question,
  type Submission,
};
