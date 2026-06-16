export interface CompareOptions {
    ignoreWhiteSpace: boolean;
}

export interface CompareState {
    originalCode: string;
    compareCode: string;
    options: CompareOptions;
}

export interface CompareResult {
  originalContent: string;
  compareContent: string;
}