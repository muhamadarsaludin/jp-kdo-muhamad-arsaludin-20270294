import { Button } from "../button/button";
import type { DatePickerLabels } from "./date-picker.type";

type DatePickerFooterProps = {
  labels: DatePickerLabels;
  todayDisabled: boolean;
  clearDisabled: boolean;
  onToday: () => void;
  onClear: () => void;
};

export function DatePickerFooter({
  labels,
  todayDisabled,
  clearDisabled,
  onToday,
  onClear,
}: DatePickerFooterProps) {
  return (
    <div className="mt-1 flex items-center justify-between border-secondary border-t px-1 pt-2">
      <Button variant="text" color="brand" size="sm" onClick={onToday} disabled={todayDisabled}>
        {labels.today}
      </Button>
      <Button variant="text" color="neutral" size="sm" onClick={onClear} disabled={clearDisabled}>
        {labels.clear}
      </Button>
    </div>
  );
}
