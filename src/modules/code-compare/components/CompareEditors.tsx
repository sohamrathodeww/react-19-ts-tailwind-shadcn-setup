import { ArrowLeftRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import AutoFormatTextarea from "../../../shared/components/AutoFormatTextarea";
import FileUploadButton from './FileUploadButton';

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
    <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] items-center">

      <Card className="overflow-hidden border border-white/5 bg-white/2 hover:border-white/10 transition-all duration-300">
        <CardHeader className="border-b border-white/5 py-4 px-5">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-bold text-white/95">
              Original Code
            </CardTitle>
            <FileUploadButton onFileLoaded={onOriginalCodeChange} />
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <AutoFormatTextarea
            value={originalCode}
            onChange={onOriginalCodeChange}
            placeholder="Paste original code here..."
          />
        </CardContent>
      </Card>

      <div className="flex items-center justify-center py-2 lg:py-0">
          <Button
              variant="secondary"
              onClick={onSwap}
              className="
                  h-12
                  w-12
                  rounded-full
                  glass-lvl3
                  border border-white/15
                  text-white/80
                  hover:text-white
                  hover:scale-110
                  hover:bg-primary/20
                  hover:border-primary/40
                  hover:shadow-[0_0_20px_rgba(109,40,217,0.4)]
                  transition-all
                  duration-300
                  flex items-center justify-center
                  cursor-pointer
              "
          >
              <ArrowLeftRight className="h-4.5 w-4.5 transition-transform duration-500 hover:rotate-180" />
          </Button>
      </div>

      <Card className="overflow-hidden border border-white/5 bg-white/2 hover:border-white/10 transition-all duration-300">
        <CardHeader className="border-b border-white/5 py-4 px-5">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-bold text-white/95">
              Compare Code
            </CardTitle>
            <FileUploadButton onFileLoaded={onCompareCodeChange} />
          </div>
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