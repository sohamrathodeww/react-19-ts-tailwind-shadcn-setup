import type {
    CompareResult
} from "../types/compare.types";
import { normalizeContent } from "../utils/compare.util";

export const compareCodeService = (
    originalCode: string,
    compareCode: string,
    ignoreWhiteSpace: boolean
): CompareResult => { 
    const normalizedOriginal = normalizeContent(
        originalCode,
        ignoreWhiteSpace
    );

    const normalizedCompare = normalizeContent(
        compareCode,
        ignoreWhiteSpace
    )

    return {
        originalContent: normalizedOriginal,
        compareContent: normalizedCompare
    }
}