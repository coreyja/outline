/**
 * Converts bytes to human readable string for display
 *
 * @param bytes filesize in bytes
 * @returns Human readable filesize as a string
 */
export function bytesToHumanReadable(bytes: number) {
  const out = ("0".repeat((bytes.toString().length * 2) % 3) + bytes).match(
    /.{3}/g
  );

  if (!out || bytes < 1000) {
    return bytes + " Bytes";
  }

  const f = out[1].substring(0, 2);

  return `${Number(out[0])}${f === "00" ? "" : `.${f}`} ${
    "  kMGTPEZY"[out.length]
  }B`;
}

/**
 * Get an array of File objects from a drag event
 *
 * @param event The react or native drag event
 * @returns An array of Files
 */
export function getDataTransferFiles(
  event: React.DragEvent<HTMLElement> | DragEvent
): File[] {
  const dt = event.dataTransfer;

  if (dt) {
    if ("files" in dt && dt.files.length) {
      return dt.files ? Array.prototype.slice.call(dt.files) : [];
    }

    if ("items" in dt && dt.items.length) {
      return dt.items
        ? Array.prototype.slice
            .call(dt.items)
            .filter((dt: DataTransferItem) => dt.kind !== "string")
            .map((dt: DataTransferItem) => dt.getAsFile())
            .filter(Boolean)
        : [];
    }
  }

  return [];
}

/**
 * Get an array of DataTransferItems from a drag event
 *
 * @param event The react or native drag event
 * @returns An array of DataTransferItems
 */
export function getDataTransferItems(
  event: React.DragEvent<HTMLElement> | DragEvent
): DataTransferItem[] {
  const dt = event.dataTransfer;

  if (dt) {
    if ("items" in dt && dt.items.length) {
      return dt.items ? Array.prototype.slice.call(dt.items) : [];
    }
  }

  return [];
}

/**
 * Get an array of Files from an input event
 *
 * @param event The react or native input event
 * @returns An array of Files
 */
export function getEventFiles(
  event: React.ChangeEvent<HTMLInputElement> | Event
): File[] {
  return event.target && "files" in event.target
    ? Array.prototype.slice.call(event.target.files)
    : [];
}

/**
 * An array of image mimetypes commonly supported by modern browsers
 */
export const supportedImageMimeTypes = [
  "image/jpg",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/apng",
  "image/avif",
  "image/gif",
  "image/webp",
  "image/svg",
  "image/svg+xml",
  "image/bmp",
  "image/tiff",
];
