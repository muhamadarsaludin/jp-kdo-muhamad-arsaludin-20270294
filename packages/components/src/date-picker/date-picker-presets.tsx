import { cn } from "@kdo/utils";

import { Chip } from "../chip/chip";
import type { DatePickerPreset, DatePickerPresetLayout } from "./date-picker.type";

type DatePickerPresetsProps = {
  presets: DatePickerPreset[];
  activeIndex: number | null;
  layout: DatePickerPresetLayout;
  disabled: boolean;
  onSelect: (index: number) => void;
};

export function DatePickerPresets({ presets, activeIndex, layout, disabled, onSelect }: DatePickerPresetsProps) {
  return (
    <div
      data-slot="presets"
      data-layout={layout}
      className={cn(
        "mt-1 flex gap-1 border-secondary border-t px-1.5 pt-2 pb-1",
        layout === "wrap" ? "flex-wrap" : "flex-nowrap overflow-x-auto overscroll-x-contain",
      )}
    >
      {presets.map((preset, index) => (
        <Chip
          key={preset.label}
          size="sm"
          shape="pill"
          variant="outline"
          selected={index === activeIndex}
          disabled={disabled}
          onClick={() => onSelect(index)}
          className="shrink-0"
        >
          {preset.label}
        </Chip>
      ))}
    </div>
  );
}
