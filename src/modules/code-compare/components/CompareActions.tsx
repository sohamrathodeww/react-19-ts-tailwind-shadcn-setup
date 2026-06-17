import { Play, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";

interface Props {
    onCompare: () => void;
    onClear: () => void;
}

export default function CompareActions({
    onCompare,
    onClear
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

            <Button size="lg" onClick={onClear} variant="destructive"
                className="min-w-[180px] ml-2"
            >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear
            </Button>
        </div>
    );
}