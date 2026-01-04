import { useState, useRef, useEffect } from "react";

type DropdownProps = {
  options: string[];
  optionsMap: Map<string, string>;
  selectedValue: string;
  onSelect: (value: string) => void;
};

type MenuProps = {
  options: string[];
  optionsMap: Map<string, string>;
  selectedValue: string;
  onSelect: (value: string) => void;
  onClose: () => void;
};

function DropdownArrow() {
  return (
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
  );
}

function Menu({
  options,
  optionsMap,
  selectedValue,
  onSelect,
  onClose,
}: MenuProps) {
  const handleSelect = (option: string) => {
    onSelect(option);
    onClose();
  };

  return (
    <div className="custom-dropdown-menu">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`custom-dropdown-item ${
            selectedValue === option ? "selected" : ""
          }`}
          onClick={() => handleSelect(option)}
          role="option"
          aria-selected={selectedValue === option}
        >
          {optionsMap.get(option) ?? option}
        </button>
      ))}
    </div>
  );
}
/**
 * DropdownMenu Component
 * @param options - The options to display in the dropdown
 * @param optionsMap - The map of options to display in the dropdown (key: value, value: label)
 * @param selectedValue - The selected value
 * @param onSelect - The function to call when a value is selected
 * @returns
 */
export function DropdownMenu({
  options,
  optionsMap,
  selectedValue,
  onSelect,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  //inline function to handle this dropdown menu specifically. could be extracted to a custom hook if needed.
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const selectedLabel = optionsMap.get(selectedValue) ?? selectedValue;

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className={`custom-dropdown-toggle ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedLabel}</span>
        <DropdownArrow />
      </button>
      {isOpen && (
        <Menu
          options={options}
          optionsMap={optionsMap}
          selectedValue={selectedValue}
          onSelect={onSelect}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
