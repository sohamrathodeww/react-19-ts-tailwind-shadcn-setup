import { useState } from "react";
import type { CompareResult } from "../types/compare.types";

export const useCodeCompare = () => {
    const [originalCode, setOriginalCode] = useState("");
    const [compareCode, setCompareCode] = useState("");
    const [compareResult, setCompareResult] = useState<CompareResult | null>(null);
    const [options, setOptions] = useState({
        ignoreWhitespace : false,
        ignoreLeadingTrailingWhitespace: false,
        ignoreMultipleSpaces: false,
        ignoreEmptyLines: false,
        ignoreTabs : false,
        ignoreCase : false
    });




    return {
        originalCode,
        compareCode,
        compareResult,
        options,
        setOriginalCode,
        setCompareCode,
        setCompareResult,
        setOptions

    };
}