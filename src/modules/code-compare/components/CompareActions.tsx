import { Play } from "lucide-react";
import { Button } from "../../../components/ui/button";

interface Props {
  onCompare: () => void;
}

export default function CompareActions({
  onCompare,
}: Props) {
  return (
    <div className="mb-6 mt-4 flex justify-center">
      <Button
        size="lg"
        onClick={onCompare}
        className="min-w-[180px]"
      >
        <Play className="mr-2 h-4 w-4" />
        Compare Code
      </Button>
    </div>
  );
}