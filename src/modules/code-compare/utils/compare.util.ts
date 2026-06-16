export const normalizeContent = (
  content: string,
  ignoreWhitespace: boolean
) => {
  if (!ignoreWhitespace) {
    return content;
  }

  return content
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
};