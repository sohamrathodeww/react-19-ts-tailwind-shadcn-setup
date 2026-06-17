import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import AutoFormatTextarea from "../../../shared/components/AutoFormatTextarea";

interface Props {
  originalCode: string;
  compareCode: string;

  onOriginalCodeChange: (
    value: string
  ) => void;

  onCompareCodeChange: (
    value: string
  ) => void;
}

export default function CompareEditors({
  originalCode,
  compareCode,
  onOriginalCodeChange,
  onCompareCodeChange,
}: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">

      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle>
            Original Code
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4">
          <AutoFormatTextarea
            value={originalCode}
            onChange={onOriginalCodeChange}
            placeholder="Paste original code here..."
          />
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle>
            Compare Code
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4">
          <AutoFormatTextarea
            value={compareCode}
            onChange={onCompareCodeChange}
            placeholder="Paste modified code here..."
          />
        </CardContent>
      </Card>

    </div>
  );
}