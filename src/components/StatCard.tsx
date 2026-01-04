import type { ReactNode } from "react";

type StatCardProps = {
  value: string | number;
  label: string;
  className?: string;
  valueColor?: string;
  description?: string;
  subValue?: ReactNode;
};

export function StatCard({
  value,
  label,
  className = "",
  valueColor,
  description,
  subValue,
}: StatCardProps) {
  const hasDescription = Boolean(description);

  return (
    <div
      className={`glass-card ${className} ${
        hasDescription ? "has-description" : ""
      }`}
    >
      {hasDescription && (
        <>
          <div className="stat-info-icon" aria-label="Information">
            <span className="info-question-mark">?</span>
          </div>
          <div className="stat-tooltip">{description}</div>
        </>
      )}
      <div
        className="stat-value"
        style={valueColor ? { color: valueColor } : undefined}
      >
        {value}
      </div>
      {subValue}
      <div className="stat-label">{label}</div>
    </div>
  );
}
