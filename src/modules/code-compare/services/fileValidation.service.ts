import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE_MB } from "../constants/file.constants";

export function validateCompareFile(
    file: File
): string | null {
    
    if (!file.name.includes(".")) {
        return "File extension missing";
    }

    if (file.size === 0) {
        return "File is empty";
    }

    const extension =
        "." +
        file.name
        .split(".")
        .pop()
        ?.toLowerCase();

    const isAllowed =
        ALLOWED_EXTENSIONS.includes(
        extension
        );

    if (
        !extension ||
        !isAllowed
    ) {
        return `Unsupported file type: ${extension}`;
    }

    const maxBytes =
        MAX_FILE_SIZE_MB *
        1024 *
        1024;

    if (
        file.size >
        maxBytes
    ) {
        return `File size exceeds ${MAX_FILE_SIZE_MB}MB`;
    }

    return null;
}