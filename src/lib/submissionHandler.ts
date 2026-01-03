import { SubmissionStructure } from "../types/index";
import { SubmissionData } from "../data/index";
import z from "zod";

/**
 * Loads and validates the submission data using Zod schemas
 * @returns Validated submission data
 * @throws Error if validation fails
 */
export function loadSubmission(): SubmissionStructure.Submission {
  const result = SubmissionStructure.SubmissionSchema.safeParse(SubmissionData);
  if (!result.success) {
    throw new Error(z.prettifyError(result.error));
  }
  return result.data;
}
