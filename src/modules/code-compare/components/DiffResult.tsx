import ReactDiffViewer from
  "react-diff-viewer-continued";

interface Props {
    originalCode: string;
    compareCode: string;
}
export default function DiffResult({
    originalCode,
    compareCode
}: Props ) {
    return(
        <ReactDiffViewer 
            oldValue={originalCode}
            newValue={compareCode}
            splitView
            showDiffOnly={false}
        />
    )
}