import CompareActions from "../components/CompareActions";
import CompareEditors from "../components/CompareEditors";
import CompareHeader from "../components/CompareHeader";
import CompareOptions from "../components/CompareOptions";
import DiffResult from "../components/DiffResult";

import { useCodeCompare } from "../hooks/useCodeCompare";
import { compareCodeService } from "../services/codeCompare.service" ;

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
  return (
    <div className="space-y-8">
      { /* Header */}
        <CompareHeader/>
      { /* Options */}
        <CompareOptions options={options} onChange={setOptions}/>
      { /* Editors */}
        <CompareEditors originalCode={originalCode} compareCode={compareCode} onOriginalCodeChange={setOriginalCode} onCompareCodeChange={setCompareCode}/>
      { /* Actions */}
        <CompareActions onCompare={handleCompare}/>
      { /* Diff Result */}
      
      {
        compareResult && (
          <DiffResult compareResult={compareResult}
          />
        )
      }
      </div>
      
  );
}