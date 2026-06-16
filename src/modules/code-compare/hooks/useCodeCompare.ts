import { useState } from "react";
import type { CompareResult } from "../types/compare.types";

export const useCodeCompare = () => {
    const [originalCode, setOriginalCode] = useState("");
    const [compareCode, setCompareCode] = useState("");
    const [ignoreWhiteSpace, setIgnoreWhiteSpace] = useState(false);
    const [compareResult, setCompareResult] = useState<CompareResult | null>(null);




    return {
        originalCode,
        compareCode,
        ignoreWhiteSpace,
        compareResult,
        setOriginalCode,
        setCompareCode,
        setIgnoreWhiteSpace,
        setCompareResult

    };
}