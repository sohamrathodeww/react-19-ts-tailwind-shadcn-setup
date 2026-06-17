import type { CompareOptions } from "../types/compare.types";

export const normalizeContent = (
  content: string,
  options: CompareOptions
): string => {
  let result = content;

  if (
    options.ignoreLeadingTrailingWhitespace
  ) {
    result = result
      .split("\n")
      .map((line) => line.trim())
      .join("\n");
  }

  if (
    options.ignoreMultipleSpaces
  ) {
    result = result.replace(/ +/g, " ");
  }

  if (
    options.ignoreTabs
  ) {
    result = result.replace(/\t/g, " ");
  }

  if (
    options.ignoreEmptyLines
  ) {
    result = result
      .split("\n")
      .filter(
        (line) => line.trim() !== ""
      )
      .join("\n");
  }

  if (
    options.ignoreCase
  ) {
    result = result.toLowerCase();
  }

  return result;
};

export const normalizeLeadingTrailing =
(
  content: string
) => {
  return content
    .split("\n")
    .map(line => line.trim())
    .join("\n");
};

export const normalizeSpaces =
(
  content: string
) => {
  return content.replace(
    / +/g,
    " "
  );
};

export const removeEmptyLines =
(
  content: string
) => {
  return content
    .split("\n")
    .filter(line => line.trim() !== "")
    .join("\n");
};

export const normalizeTabs =
(
  content: string
) => {
  return content.replace(
    /\t/g,
    " "
  );
};