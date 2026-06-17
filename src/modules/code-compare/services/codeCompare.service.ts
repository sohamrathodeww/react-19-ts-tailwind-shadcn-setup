import type {
    CompareOptions,
    CompareResult
} from "../types/compare.types";
import { normalizeContent } from "../utils/compare.util";
import { calculateDifferenceCount }
from "../utils/calculateDifferenceCount";

export const compareCodeService = (
    originalCode: string,
    compareCode: string,
    options: CompareOptions,
): CompareResult => { 
    const normalizedOriginal = normalizeContent(
        originalCode,
        options
    );

    const normalizedCompare = normalizeContent(
        compareCode,
        options
    )

    const differenceCount = calculateDifferenceCount(
        normalizedOriginal,
        normalizedCompare
    )

    return {
        originalContent: normalizedOriginal,
        compareContent: normalizedCompare,
        differenceCount
    }
}