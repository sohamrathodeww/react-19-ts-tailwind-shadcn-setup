import { ArrowLeftRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
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

  onSwap: () => void;
}

export default function CompareEditors({
  originalCode,
  compareCode,
  onOriginalCodeChange,
  onCompareCodeChange,
  onSwap,
}: Props) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr]">

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

        <div className="flex items-center justify-center lg:flex-row">
            <Button
                variant="outline"
                size="icon"
                onClick={onSwap}
                className="
                h-12
                w-12
                rounded-full
                shadow-md
                "
            >
                <ArrowLeftRight className="h-5 w-5" />
            </Button>
        </div>
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