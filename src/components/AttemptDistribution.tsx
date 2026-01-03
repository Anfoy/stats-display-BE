import { Statistics } from "../types/index";
import { StatCard } from "./StatCard";

interface AttemptDistributionProps {
  distribution: Statistics.OverallStats["attemptDistribution"];
}

export function AttemptDistribution({
  distribution,
}: AttemptDistributionProps) {
  return (
    <div className="section">
      <h2 className="section-title section-title-distribution">
        Total Attempt Distribution
      </h2>
      <p className="section-description">
        <span className="section-description-icon">?</span>
        Breakdown of questions by the number of attempts required to answer
        correctly
      </p>
      <div className="stats-grid">
        <StatCard
          value={`${distribution.oneAttemptPercent.toFixed(1)}%`}
          label="One Attempt"
          className="attempt-distribution-card"
          description="The percentage of questions that were answered correctly on the first attempt."
        />
        <StatCard
          value={`${distribution.twoAttemptsPercent.toFixed(1)}%`}
          label="Two Attempts"
          className="attempt-distribution-card"
          description="The percentage of questions that required exactly two attempts to answer correctly."
        />
        <StatCard
          value={`${distribution.threeOrMorePercent.toFixed(1)}%`}
          label="Three or More Attempts"
          className="attempt-distribution-card"
          description="The percentage of questions that required three or more attempts to answer correctly."
        />
      </div>
    </div>
  );
}
