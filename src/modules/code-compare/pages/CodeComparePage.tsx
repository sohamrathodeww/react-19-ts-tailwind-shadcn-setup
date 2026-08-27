import CompareActions from "../components/CompareActions";
import CompareEditors from "../components/CompareEditors";
import CompareHeader from "../components/CompareHeader";
import CompareOptions from "../components/CompareOptions";
import DiffResult from "../components/DiffResult";
import { motion } from "motion/react";

import { useCodeCompare } from "../hooks/useCodeCompare";
import { compareCodeService } from "../services/codeCompare.service" ;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
} as const;

export default function CodeComparePage() {
  const { 
    originalCode,
    compareCode,  
    compareResult,
    options,
    setOriginalCode, 
    setCompareCode, 
    setCompareResult,
    setOptions
  } = useCodeCompare();
  
  const handleCompare = () => {
    console.log(`Comparing .........`);
    console.log(`originalCode >>>> `, originalCode);
    console.log(`compareCode >>>> `, compareCode);
    console.log(`options >>>> `, options);
    const result = compareCodeService(originalCode, compareCode, options);
    setCompareResult(result);
  }
  const handleSwap = () => {
    const temp = originalCode;
    setOriginalCode(compareCode);
    setCompareCode(temp);

    if (compareResult) {
      const result = compareCodeService(
        compareCode,
        originalCode,
        options
      );

      setCompareResult(result);
    }
  }

  const handleClear = () => {
    setOriginalCode("");
    setCompareCode("");
    setCompareResult(null);
  }
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-none w-full py-6 space-y-6"
    >
      {/* Hero */}
      <motion.div variants={itemVariants}>
        <CompareHeader />
      </motion.div>

      {/* Editors */}
      <motion.div variants={itemVariants}>
        <CompareEditors
          originalCode={originalCode}
          compareCode={compareCode}
          onOriginalCodeChange={setOriginalCode}
          onCompareCodeChange={setCompareCode}
          onSwap={handleSwap}
        />
      </motion.div>

      {/* Options */}
      <motion.div variants={itemVariants}>
        <CompareOptions
          options={options}
          onChange={setOptions}
        />
      </motion.div>

      {/* Toolbar */}
      <motion.div variants={itemVariants}>
        <CompareActions
          onCompare={handleCompare}
          onClear={handleClear}
        />
      </motion.div>

      {/* Result */}
      {compareResult && (
        <motion.div variants={itemVariants}>
          <DiffResult
            compareResult={compareResult}
          />
        </motion.div>
      )}
    </motion.div>
  );
}