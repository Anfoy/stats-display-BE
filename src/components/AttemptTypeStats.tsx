import { useState, useMemo } from "react";
import { SubmissionStructure, Statistics } from "../types/index";
import { StatisticsHandler } from "../lib/index";
import { StatCard } from "./StatCard";
import { AttemptTypeSelector } from "./AttemptTypeSelector";
import { cardData } from "../data/index";
export function AttemptTypeStats({
  submission,
}: {
  submission: SubmissionStructure.Submission;
}) {
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

function AttemptTypeStatsCards({ stats }: { stats: Statistics.OverallStats }) {
  return (
    <div className="stats-grid">
      <StatCard
        value={stats.totalQuestions}
        label={cardData.totalQuestions.label}
        valueColor={StatisticsHandler.getAccuracyColor(stats.correctRate)}
        description={cardData.totalQuestions.description}
      />
      <StatCard
        value={stats.totalAttempts}
        label={cardData.totalAttempts.label}
        valueColor={cardData.totalAttempts.valueColor}
        description={cardData.totalAttempts.description}
      />
      <StatCard
        value={stats.correctAnswers}
        label={cardData.correctAnswers.label}
        valueColor={cardData.correctAnswers.valueColor}
        description={cardData.correctAnswers.description}
      />
      <StatCard
        value={stats.incorrectAnswers}
        label={cardData.incorrectAnswers.label}
        valueColor={cardData.incorrectAnswers.valueColor}
        description={cardData.incorrectAnswers.description}
      />
      <StatCard
        value={stats.totalIncorrectAttempts}
        label={cardData.totalIncorrectAttempts.label}
        valueColor={cardData.totalIncorrectAttempts.valueColor}
        description={cardData.totalIncorrectAttempts.description}
      />
      <StatCard
        value={stats.averageAttempts.toFixed(2)} //two decimal places
        label={cardData.averageAttempts.label}
        valueColor={cardData.averageAttempts.valueColor}
        description={cardData.averageAttempts.description}
      />
      <StatCard
        value={`${stats.firstTryRate.toFixed(1)}%`}
        label={cardData.firstTryRate.label}
        valueColor={cardData.firstTryRate.valueColor}
        description={cardData.firstTryRate.description}
      />
    </div>
  );
}
