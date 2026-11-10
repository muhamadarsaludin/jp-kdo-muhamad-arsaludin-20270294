import {
  type ChangeEvent,
  type DragEvent,
  type KeyboardEvent,
  type RefObject,
  useCallback,
  useRef,
  useState,
} from "react";

export type FileSelectErrorCode = "type" | "size" | "count" | "totalSize";

export type FileSelectError = {
  code: FileSelectErrorCode;
  file: File;
  message: string;
};

export type UseFileSelectOptions = {
  accept?: string;
  maxBytes?: number;
  /** Maximum number of files accepted in one selection batch. Extra files are rejected with code `"count"`. */
  maxFiles?: number;
  /** Maximum combined size (in bytes) of the accepted files. Files that would exceed it are rejected with code `"totalSize"`. */
  maxTotalBytes?: number;
  multiple?: boolean;
  disabled?: boolean;
  onFiles?: (files: File[]) => void;
  onError?: (error: FileSelectError) => void;
};

export type UseFileSelectResult = {
  getInputProps: () => {
    ref: RefObject<HTMLInputElement | null>;
    type: "file";
    accept?: string;
    multiple: boolean;
    disabled: boolean;
    tabIndex: -1;
    "aria-hidden": true;
    className: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
  getRootProps: () => {
    role: "button";
    tabIndex: number;
    "aria-disabled"?: boolean;
    onClick: () => void;
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
    onDragEnter: (event: DragEvent<HTMLElement>) => void;
    onDragOver: (event: DragEvent<HTMLElement>) => void;
    onDragLeave: (event: DragEvent<HTMLElement>) => void;
    onDrop: (event: DragEvent<HTMLElement>) => void;
  };
  isDragging: boolean;
  open: () => void;
};

function matchesAccept(file: File, accept?: string): boolean {
  if (!accept) return true;

  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();

  return accept
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean)
    .some((token) => {
      if (token.startsWith(".")) return name.endsWith(token);
      if (token.endsWith("/*")) return type.startsWith(token.slice(0, -1));
      return type === token;
    });
}

export function useFileSelect(options: UseFileSelectOptions = {}): UseFileSelectResult {
  const {
    accept,
    maxBytes,
    maxFiles,
    maxTotalBytes,
    multiple = false,
    disabled = false,
    onFiles,
    onError,
  } = options;

  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragDepth = useRef(0);

  const validate = useCallback(
    (file: File): FileSelectError | null => {
      if (!matchesAccept(file, accept)) {
        return { code: "type", file, message: `${file.name} is not an accepted file type.` };
      }
      if (maxBytes !== undefined && file.size > maxBytes) {
        return { code: "size", file, message: `${file.name} exceeds the maximum file size.` };
      }

      return null;
    },
    [accept, maxBytes],
  );

  const handleFiles = useCallback(
    (fileList: FileList | File[]) => {
      const selected = Array.from(fileList);
      const candidates = multiple ? selected : selected.slice(0, 1);
      const accepted: File[] = [];
      let totalBytes = 0;

      for (const file of candidates) {
        if (maxFiles !== undefined && accepted.length >= maxFiles) {
          onError?.({
            code: "count",
            file,
            message: `You can upload at most ${maxFiles} ${maxFiles === 1 ? "file" : "files"}.`,
          });
          continue;
        }
        const error = validate(file);
        if (error) {
          onError?.(error);
          continue;
        }
        if (maxTotalBytes !== undefined && totalBytes + file.size > maxTotalBytes) {
          onError?.({
            code: "totalSize",
            file,
            message: `Adding ${file.name} would exceed the maximum total size.`,
          });
          continue;
        }
        accepted.push(file);
        totalBytes += file.size;
      }

      if (accepted.length > 0) onFiles?.(accepted);
    },
    [maxFiles, maxTotalBytes, multiple, onFiles, onError, validate],
  );

  const open = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const getInputProps = useCallback(
    () => ({
      ref: inputRef,
      type: "file" as const,
      accept,
      multiple,
      disabled,
      tabIndex: -1 as const,
      "aria-hidden": true as const,
      className: "sr-only",
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) handleFiles(event.target.files);
        // Reset so picking the same file again still fires onChange.
        event.target.value = "";
      },
    }),
    [accept, multiple, disabled, handleFiles],
  );

  const getRootProps = useCallback(
    () => ({
      role: "button" as const,
      tabIndex: disabled ? -1 : 0,
      "aria-disabled": disabled ? true : undefined,
      onClick: open,
      onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open();
        }
      },
      onDragEnter: (event: DragEvent<HTMLElement>) => {
        event.preventDefault();
        if (disabled) return;
        dragDepth.current += 1;
        setIsDragging(true);
      },
      onDragOver: (event: DragEvent<HTMLElement>) => {
        event.preventDefault();
      },
      onDragLeave: (event: DragEvent<HTMLElement>) => {
        event.preventDefault();
        dragDepth.current -= 1;
        if (dragDepth.current <= 0) {
          dragDepth.current = 0;
          setIsDragging(false);
        }
      },
      onDrop: (event: DragEvent<HTMLElement>) => {
        event.preventDefault();
        dragDepth.current = 0;
        setIsDragging(false);
        if (!disabled && event.dataTransfer?.files) handleFiles(event.dataTransfer.files);
      },
    }),
    [disabled, open, handleFiles],
  );

  return { getInputProps, getRootProps, isDragging, open };
}
