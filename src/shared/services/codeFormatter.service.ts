import prettier from "prettier/standalone";
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";

export const autoFormatContent = async (
  content: string
): Promise<string> => {
  // JSON
  try {
    const parsed = JSON.parse(content);

    return JSON.stringify(
      parsed,
      null,
      2
    );
  } catch {
    console.log(`catch block`);
  }

  // JavaScript / TypeScript
  try {
    return await prettier.format(
      content,
      {
        parser: "babel",
        plugins: [
          babelPlugin,
          estreePlugin,
        ],
      }
    );
  } catch {
    console.log(`catch block`);
  }

  return content;
};