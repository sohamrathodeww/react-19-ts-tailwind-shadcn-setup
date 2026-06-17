export interface CompareOptions {
    ignoreWhitespace: boolean;
    ignoreLeadingTrailingWhitespace: boolean;
    ignoreMultipleSpaces: boolean;
    ignoreEmptyLines: boolean;
    ignoreTabs: boolean;
    ignoreCase: boolean;
}

export interface CompareState {
    originalCode: string;
    compareCode: string;
    options: CompareOptions;
}

export interface CompareResult {
  originalContent: string;
  compareContent: string;
  differenceCount: number;
}