import { useState, useMemo } from "react";
import { SubmissionStructure, Statistics } from "../types/index";
import { StatisticsHandler } from "../lib/index";
import { StatCard } from "./StatCard";
import { AttemptTypeSelector } from "./AttemptTypeSelector";

interface AttemptTypeStatsProps {
  submission: SubmissionStructure.Submission;
}

interface AttemptTypeStatsCardsProps {
  stats: Statistics.OverallStats;
}

export function AttemptTypeStats({ submission }: AttemptTypeStatsProps) {
  const attemptTypesMap = useMemo(
    () => StatisticsHandler.getAttemptTypes(submission),
    [submission]
  );

  //using useMemo to memoize the attempt map
  // so that way it only recalculates when the attempt types map changes
  const attemptTypes = useMemo(
    () => Array.from(attemptTypesMap.keys()),
    [attemptTypesMap]
  );

  const [selectedAttemptType, setSelectedAttemptType] = useState<string>(
    () => attemptTypes[0] ?? ""
  );

  const stats = useMemo(
    () =>
      StatisticsHandler.calculateStats(submission, selectedAttemptType)
        .overallStats,
    [submission, selectedAttemptType]
  );

  return (
    <div className="section">
      <h2 className="section-title section-title-attempt-type">
        Statistics by Attempt Type
      </h2>
      <p className="section-description">
        <span className="section-description-icon">?</span>
        View performance metrics filtered by specific attempt types
      </p>
      <AttemptTypeSelector
        attemptTypes={attemptTypes}
        attemptTypesMap={attemptTypesMap}
        selectedAttemptType={selectedAttemptType}
        onChange={setSelectedAttemptType}
      />
      <AttemptTypeStatsCards stats={stats} />
    </div>
  );
}

function AttemptTypeStatsCards({ stats }: AttemptTypeStatsCardsProps) {
  return (
    <div className="stats-grid">
      <StatCard
        value={stats.totalQuestions}
        label="Total Questions"
        valueColor={StatisticsHandler.getAccuracyColor(stats.correctRate)}
        description="The total number of questions for the selected attempt type."
      />
      <StatCard
        value={stats.totalAttempts}
        label="Total Attempts"
        valueColor="#FFB347"
        description="The sum of all attempts made for this attempt type, including both correct and incorrect attempts."
      />
      <StatCard
        value={stats.correctAnswers}
        label="Correct Answers"
        valueColor="#4CAF50"
        description="The number of questions that were eventually answered correctly for this attempt type."
      />
      <StatCard
        value={stats.incorrectAnswers}
        label="Incorrect Answers"
        valueColor="#F44336"
        description="The number of questions that were never answered correctly for this attempt type."
      />
      <StatCard
        value={stats.totalIncorrectAttempts}
        label="Incorrect Attempts"
        valueColor="#FF6B6B"
        description="The total count of all incorrect attempts made for this attempt type."
      />
      <StatCard
        value={stats.averageAttempts.toFixed(2)} //two decimal places
        label="Average Attempts"
        valueColor="#36A2EB"
        description="The average number of attempts per question for this attempt type."
      />
      <StatCard
        value={`${stats.firstTryRate.toFixed(1)}%`}
        label="First Try Success Rate"
        valueColor="#FF6384"
        description="The percentage of questions answered correctly on the first attempt for this attempt type."
      />
    </div>
  );
}
