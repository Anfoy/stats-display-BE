import { StatisticsHandler } from "../lib";
import { Statistics } from "../types/index";
import { StatCard } from "./StatCard";
import { cardData } from "../data/index";

export function OverallStats({ stats }: { stats: Statistics.OverallStats }) {
  const accuracyColor = StatisticsHandler.getAccuracyColor(stats.correctRate);

  return (
    <div className="section">
      <h2 className="section-title section-title-overall">
        Your Overall Stats
      </h2>
      <p className="section-description">
        <span className="section-description-icon">?</span>
        Comprehensive statistics across all questions and attempt types
      </p>
      <div className="stats-grid">
        <StatCard
          value={stats.totalQuestions}
          label={cardData.totalQuestions.label}
          valueColor={accuracyColor}
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
          value={stats.averageAttempts.toFixed(2)}
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
    </div>
  );
}
