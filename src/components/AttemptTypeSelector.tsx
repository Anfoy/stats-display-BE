import { DropdownMenu } from "../ui/DropdownMenu";

type AttemptTypeSelectorProps = {
  attemptTypes: string[];
  attemptTypesMap: Map<string, string>;
  selectedAttemptType: string;
  onChange: (value: string) => void;
};

export function AttemptTypeSelector({
  attemptTypes,
  attemptTypesMap,
  selectedAttemptType,
  onChange,
}: AttemptTypeSelectorProps) {
  return (
    <div className="attempt-type-selector">
      <label htmlFor="attempt-type-select">Select Attempt Type:</label>
      <DropdownMenu
        options={attemptTypes}
        optionsMap={attemptTypesMap}
        selectedValue={selectedAttemptType}
        onSelect={onChange}
      />
    </div>
  );
}
