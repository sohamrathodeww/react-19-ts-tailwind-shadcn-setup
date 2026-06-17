import ReactDiffViewer from "react-diff-viewer-continued";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import type {
  CompareResult,
} from "../types/compare.types";

interface Props {
  compareResult: CompareResult;
}

export default function DiffResult({
  compareResult,
}: Props) {
  return (
    <div className="space-y-6">

      {/* Stats */}

      <div className="grid gap-4 md:grid-cols-3">

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Differences Found
            </p>

            <p className="mt-2 text-3xl font-bold">
              {compareResult.differenceCount}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Comparison Status
            </p>

            <p className="mt-2 text-lg font-semibold text-green-500">
              Completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              View Mode
            </p>

            <p className="mt-2 text-lg font-semibold">
              Side By Side
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Diff Viewer */}

      <Card>
        <CardHeader>
          <CardTitle>
            Diff Result
          </CardTitle>
        </CardHeader>

        <CardContent>

          <div className="overflow-auto rounded-lg border">

            <ReactDiffViewer
              oldValue={
                compareResult.originalContent
              }
              newValue={
                compareResult.compareContent
              }
              splitView
              showDiffOnly={false}
            />

          </div>

        </CardContent>
      </Card>

    </div>
  );
}