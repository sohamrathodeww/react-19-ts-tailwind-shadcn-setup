import ReactDiffViewer from  "react-diff-viewer-continued";
import type{ CompareResult } from '../types/compare.types';

interface Props {
  compareResult: CompareResult;
}
export default function DiffResult({
    compareResult
}: Props ) {
    return(
        <>
            <div className="rounded-md border p-4">
                <h3 className="font-semibold"> Comparison Summary </h3>
                <p> Total Differences: { compareResult?.differenceCount || 0} </p>
            </div>
            <ReactDiffViewer 
                oldValue={compareResult?.originalContent || ``}
                newValue={compareResult?.compareContent || ``}
                splitView
                showDiffOnly={false}
            />
        </>
    )
}