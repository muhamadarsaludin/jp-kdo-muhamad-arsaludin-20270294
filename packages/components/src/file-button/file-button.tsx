import { Button, type ButtonProps } from "../button";
import { type FileSelectError, useFileSelect } from "../lib/use-file-select";

export type FileButtonProps = Omit<ButtonProps, "onClick" | "type"> & {
  accept?: string;
  maxBytes?: number;
  multiple?: boolean;
  onFiles?: (files: File[]) => void;
  onError?: (error: FileSelectError) => void;
};

export function FileButton({
  accept,
  maxBytes,
  multiple,
  disabled,
  onFiles,
  onError,
  ...buttonProps
}: FileButtonProps) {
  const { getInputProps, open } = useFileSelect({
    accept,
    maxBytes,
    multiple,
    disabled,
    onFiles,
    onError,
  });

  return (
    <>
      <input {...getInputProps()} />
      <Button {...buttonProps} type="button" disabled={disabled} onClick={open} />
    </>
  );
}
