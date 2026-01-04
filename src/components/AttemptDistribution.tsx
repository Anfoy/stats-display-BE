import { cardData } from "../data/cardData";
import { Statistics } from "../types/index";
import { StatCard } from "./StatCard";

export function AttemptDistribution({
  distribution,
}: {
  distribution: Statistics.OverallStats["attemptDistribution"];
}) {
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
          label={cardData.oneAttempt.label}
          className={cardData.oneAttempt.className}
          description={cardData.oneAttempt.description}
        />
        <StatCard
          value={`${distribution.twoAttemptsPercent.toFixed(1)}%`}
          label={cardData.twoAttempts.label}
          className={cardData.twoAttempts.className}
          description={cardData.twoAttempts.description}
        />
        <StatCard
          value={`${distribution.threeOrMorePercent.toFixed(1)}%`}
          label={cardData.threeOrMoreAttempts.label}
          className={cardData.threeOrMoreAttempts.className}
          description={cardData.threeOrMoreAttempts.description}
        />
      </div>
    </div>
  );
}
