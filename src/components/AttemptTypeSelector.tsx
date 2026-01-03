import { useState, useRef, useEffect } from "react";

interface AttemptTypeSelectorProps {
  attemptTypes: string[];
  attemptTypesMap: Map<string, string>;
  selectedAttemptType: string;
  onChange: (value: string) => void;
}

export function AttemptTypeSelector({
  attemptTypes,
  attemptTypesMap,
  selectedAttemptType,
  onChange,
}: AttemptTypeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedLabel =
    attemptTypesMap.get(selectedAttemptType) ?? selectedAttemptType;

  return (
    <div className="attempt-type-selector">
      <label htmlFor="attempt-type-select">Select Attempt Type:</label>
      <div className="custom-dropdown" ref={dropdownRef}>
        <button
          type="button"
          className={`custom-dropdown-toggle ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>{selectedLabel}</span>
          <svg
            className="dropdown-arrow"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 10L2 5h10z" fill="currentColor" />
          </svg>
        </button>
        {isOpen && (
          <div className="custom-dropdown-menu">
            {attemptTypes.map((attemptType) => (
              <button
                key={attemptType}
                type="button"
                className={`custom-dropdown-item ${
                  selectedAttemptType === attemptType ? "selected" : ""
                }`}
                onClick={() => {
                  onChange(attemptType);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={selectedAttemptType === attemptType}
              >
                {attemptTypesMap.get(attemptType) ?? attemptType}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
