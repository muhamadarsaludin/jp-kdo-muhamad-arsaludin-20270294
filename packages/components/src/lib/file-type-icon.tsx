import { cn } from "@kdo/utils";

export type FileTypeIconKind =
  | "image"
  | "video"
  | "audio"
  | "pdf"
  | "word"
  | "sheet"
  | "slides"
  | "archive"
  | "code"
  | "text"
  | "vector"
  | "corrupt"
  | "generic";

export type FileTypeIconProps = {
  type?: string;
  name?: string;
  kind?: FileTypeIconKind;
  className?: string;
};

const documentBody =
  "M6.8 2.6h6.4L19.5 8.9v10.2a2.3 2.3 0 0 1-2.3 2.3H6.8a2.3 2.3 0 0 1-2.3-2.3V4.9a2.3 2.3 0 0 1 2.3-2.3Z";
const documentFold = "M13.2 2.6v4a2.3 2.3 0 0 0 2.3 2.3h4Z";

const kindColors: Record<FileTypeIconKind, { body: string; fold: string }> = {
  image: { body: "fill-utility-violet-500", fold: "fill-utility-violet-700" },
  video: { body: "fill-utility-pink-500", fold: "fill-utility-pink-700" },
  audio: { body: "fill-utility-fuchsia-500", fold: "fill-utility-fuchsia-700" },
  pdf: { body: "fill-utility-red-500", fold: "fill-utility-red-700" },
  word: { body: "fill-utility-blue-500", fold: "fill-utility-blue-700" },
  sheet: { body: "fill-utility-green-500", fold: "fill-utility-green-700" },
  slides: { body: "fill-utility-orange-500", fold: "fill-utility-orange-700" },
  archive: { body: "fill-utility-yellow-500", fold: "fill-utility-yellow-700" },
  code: { body: "fill-utility-indigo-500", fold: "fill-utility-indigo-700" },
  text: { body: "fill-utility-slate-500", fold: "fill-utility-slate-700" },
  vector: { body: "fill-utility-cyan-500", fold: "fill-utility-cyan-700" },
  corrupt: { body: "fill-utility-neutral-400", fold: "fill-utility-neutral-600" },
  generic: { body: "fill-utility-neutral-400", fold: "fill-utility-neutral-600" },
};

const extensionKinds: Record<string, FileTypeIconKind> = {
  png: "image",
  jpg: "image",
  jpeg: "image",
  gif: "image",
  webp: "image",
  avif: "image",
  heic: "image",
  svg: "vector",
  mp4: "video",
  mov: "video",
  webm: "video",
  avi: "video",
  mkv: "video",
  mp3: "audio",
  wav: "audio",
  ogg: "audio",
  flac: "audio",
  m4a: "audio",
  aac: "audio",
  pdf: "pdf",
  doc: "word",
  docx: "word",
  rtf: "word",
  odt: "word",
  xls: "sheet",
  xlsx: "sheet",
  csv: "sheet",
  ods: "sheet",
  ppt: "slides",
  pptx: "slides",
  odp: "slides",
  txt: "text",
  md: "text",
  zip: "archive",
  rar: "archive",
  "7z": "archive",
  tar: "archive",
  gz: "archive",
  js: "code",
  jsx: "code",
  ts: "code",
  tsx: "code",
  json: "code",
  html: "code",
  css: "code",
  xml: "code",
  yml: "code",
  yaml: "code",
};

export function fileTypeKind(type?: string, name?: string): FileTypeIconKind {
  const mime = type?.toLowerCase();
  if (mime) {
    if (mime === "image/svg+xml") return "vector";
    if (mime.startsWith("image/")) return "image";
    if (mime.startsWith("video/")) return "video";
    if (mime.startsWith("audio/")) return "audio";
    if (mime === "application/pdf") return "pdf";
    if (mime.includes("word") || mime.includes("opendocument.text")) return "word";
    if (mime.includes("excel") || mime.includes("spreadsheet") || mime === "text/csv") return "sheet";
    if (mime.includes("powerpoint") || mime.includes("presentation")) return "slides";
    if (mime.includes("zip") || mime.includes("compressed") || mime.includes("tar") || mime.includes("rar")) {
      return "archive";
    }
    if (mime.startsWith("text/")) return "text";
  }

  const extension = name?.split(".").pop()?.toLowerCase();
  if (extension && extensionKinds[extension]) return extensionKinds[extension];

  return "generic";
}

function Glyph({ kind, body }: { kind: FileTypeIconKind; body: string }) {
  switch (kind) {
    case "image":
      return (
        <g>
          <rect x="7.2" y="11.2" width="7.8" height="6.6" rx="1.2" fill="white" />
          <circle cx="13" cy="13.4" r="1" className={body} />
          <path d="M7.9 17.4l2.3-2.6 1.5 1.6 1.2-1.2 1.9 2.2z" className={body} />
        </g>
      );
    case "video":
      return <path d="M9.7 11.4 14.5 14.5 9.7 17.6Z" fill="white" />;
    case "audio":
      return (
        <g fill="white">
          <rect x="10.5" y="11.1" width="1.1" height="5.4" rx="0.55" />
          <rect x="14.3" y="10.5" width="1.1" height="5.4" rx="0.55" />
          <path d="M10.5 11.1 15.4 10.5v1.7l-4.9.6z" />
          <ellipse cx="9.7" cy="16.6" rx="1.5" ry="1.1" transform="rotate(-16 9.7 16.6)" />
          <ellipse cx="13.5" cy="16" rx="1.5" ry="1.1" transform="rotate(-16 13.5 16)" />
        </g>
      );
    case "pdf":
      return (
        <g>
          <rect x="7.2" y="11.2" width="7.8" height="6.6" rx="1.2" fill="white" />
          <path d="M10.3 11.2h3.6v4.4l-1.8-1.3-1.8 1.3z" className={body} />
        </g>
      );
    case "sheet":
      return (
        <g fill="white">
          <rect x="7.4" y="11.5" width="3.4" height="2.7" rx="0.4" />
          <rect x="11.4" y="11.5" width="3.4" height="2.7" rx="0.4" />
          <rect x="7.4" y="14.6" width="3.4" height="2.7" rx="0.4" />
          <rect x="11.4" y="14.6" width="3.4" height="2.7" rx="0.4" />
        </g>
      );
    case "slides":
      return (
        <g>
          <rect x="7.2" y="11.5" width="7.8" height="5.6" rx="1.1" fill="white" />
          <rect x="8.1" y="12.4" width="6" height="3.8" rx="0.4" className={body} />
        </g>
      );
    case "archive":
      return (
        <g>
          <rect x="7.4" y="11.4" width="7.2" height="6.6" rx="1.2" fill="white" />
          <g className={body}>
            <rect x="11" y="11.9" width="1.2" height="1" rx="0.3" />
            <rect x="11" y="13.3" width="1.2" height="1" rx="0.3" />
            <rect x="11" y="14.7" width="1.2" height="1" rx="0.3" />
            <rect x="10.5" y="16.1" width="2.2" height="1.6" rx="0.5" />
          </g>
        </g>
      );
    case "code":
      return (
        <g fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.6 11.7 7.4 14.5 9.6 17.3" />
          <path d="M12.8 11.7 15 14.5 12.8 17.3" />
          <path d="M12 11.3 10.9 17.7" />
        </g>
      );
    case "vector":
      return (
        <g>
          <path
            d="M8.2 16.9C9.4 12.6 13.5 17.4 15.6 12.2"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="8.2" cy="16.9" r="1.05" fill="white" />
          <circle cx="15.6" cy="12.2" r="1.05" fill="white" />
        </g>
      );
    case "text":
      return (
        <g fill="white">
          <rect x="7.4" y="12" width="7" height="1.3" rx="0.65" />
          <rect x="7.4" y="14.3" width="7" height="1.3" rx="0.65" />
          <rect x="7.4" y="16.6" width="4.5" height="1.3" rx="0.65" />
        </g>
      );
    default:
      return (
        <g fill="white">
          <rect x="7.4" y="11.6" width="7.4" height="1.3" rx="0.65" />
          <rect x="7.4" y="13.9" width="7.4" height="1.3" rx="0.65" />
          <rect x="7.4" y="16.2" width="5.2" height="1.3" rx="0.65" />
        </g>
      );
  }
}

function CorruptIcon({ className, colors }: { className?: string; colors: { body: string; fold: string } }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      data-slot="file-type-icon"
      data-kind="corrupt"
      className={cn("shrink-0", className)}
    >
      <path
        d="M6.8 2.6h6.4L19.5 8.9v3.1l-2.3 1.5-2.7-1.7-2.6 1.7-2.7-1.7-2.6 1.7-2.1-1.4V4.9a2.3 2.3 0 0 1 2.3-2.3Z"
        className={colors.body}
      />
      <path d={documentFold} className={colors.fold} />
      <path
        d="M19.5 13.6l-2.3 1.5-2.7-1.7-2.6 1.7-2.7-1.7-2.6 1.7-2.1-1.4v4.4a2.3 2.3 0 0 0 2.3 2.3h10.4a2.3 2.3 0 0 0 2.3-2.3Z"
        className={colors.body}
      />
    </svg>
  );
}

export function FileTypeIcon({ type, name, kind: kindProp, className }: FileTypeIconProps) {
  const kind = kindProp ?? fileTypeKind(type, name);
  const colors = kindColors[kind];

  if (kind === "corrupt") return <CorruptIcon className={className} colors={colors} />;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      data-slot="file-type-icon"
      data-kind={kind}
      className={cn("shrink-0", className)}
    >
      <path d={documentBody} className={colors.body} />
      <path d={documentFold} className={colors.fold} />
      <Glyph kind={kind} body={colors.body} />
    </svg>
  );
}
