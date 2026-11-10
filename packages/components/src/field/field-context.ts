import { createContext } from "react";

import type { Status } from "../type";
import type { FieldColor } from "./field-variants";

export type FieldContextValue = {
  controlId?: string;
  descriptionId?: string;
  descriptionPresent?: boolean;
  setDescriptionPresent?: (present: boolean) => void;
  required?: boolean;
  status?: Status;
  color?: FieldColor;
  current?: number;
  max?: number;
  separator?: string;
};

export const FieldContext = createContext<FieldContextValue | undefined>(undefined);
