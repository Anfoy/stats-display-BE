import { useState, useRef, useEffect } from "react";
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
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    if (!isTooltipOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsTooltipOpen(false); //when clicking outside the card, the tooltip closes
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTooltipOpen]);

  //toggle the tooltip open state
  const toggleTooltip = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };

  return (
    <div
      ref={cardRef}
      className={`glass-card ${className} ${
        hasDescription ? "has-description" : ""
      } ${isTooltipOpen ? "tooltip-open" : ""}`}
    >
      {hasDescription && (
        <>
          <div
            className="stat-info-icon"
            aria-label="Information"
            onClick={toggleTooltip}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                toggleTooltip();
              }
            }}
          >
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
