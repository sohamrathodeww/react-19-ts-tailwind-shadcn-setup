export const calculateDifferenceCount = (
  left: string,
  right: string
): number => {
  const leftLines = left.split("\n");
  const rightLines = right.split("\n");

  const maxLength = Math.max(
    leftLines.length,
    rightLines.length
  );

  let differenceCount = 0;

  for (let i = 0; i < maxLength; i++) {
    const leftLine = leftLines[i] ?? "";
    const rightLine = rightLines[i] ?? "";

    if (leftLine !== rightLine) {
      differenceCount++;
    }
  }

  return differenceCount;
};