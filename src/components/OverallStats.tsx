import { StatisticsHandler } from "../lib";
import { Statistics } from "../types/index";
import { StatCard } from "./StatCard";

interface OverallStatsProps {
  stats: Statistics.OverallStats;
}

export function OverallStats({ stats }: OverallStatsProps) {
  const accuracyColor = StatisticsHandler.getAccuracyColor(stats.correctRate);

  return (
    <div className="section">
      <h2 className="section-title section-title-overall">
        Overall Statistics
      </h2>
      <p className="section-description">
        <span className="section-description-icon">?</span>
        Comprehensive statistics across all questions and attempt types
      </p>
      <div className="stats-grid">
        <StatCard
          value={stats.totalQuestions}
          label="Total Questions"
          valueColor={accuracyColor}
          description="The total number of questions in the exam or assessment."
        />
        <StatCard
          value={stats.totalAttempts}
          label="Total Attempts"
          valueColor="#FFB347"
          description="The sum of all attempts made across all questions. This includes both correct and incorrect attempts."
        />
        <StatCard
          value={stats.correctAnswers}
          label="Correct Answers"
          valueColor="#4CAF50"
          description="The number of questions that were eventually answered correctly, regardless of how many attempts it took."
        />
        <StatCard
          value={stats.incorrectAnswers}
          label="Incorrect Answers"
          valueColor="#F44336"
          description="The number of questions that were never answered correctly, even after multiple attempts."
        />
        <StatCard
          value={stats.averageAttempts.toFixed(2)}
          label="Average Attempts"
          valueColor="#36A2EB"
          description="The average number of attempts per question, calculated by dividing total attempts by total questions."
        />
        <StatCard
          value={`${stats.firstTryRate.toFixed(1)}%`}
          label="First Try Success Rate"
          valueColor="#FF6384"
          description="The percentage of questions that were answered correctly on the first attempt."
        />
      </div>
    </div>
  );
}
