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
        <div className="mb-8 mt-6 flex justify-center gap-4">
            
            <Button
                size="lg"
                onClick={onCompare}
                className="min-w-[200px] cursor-pointer"
            >
                <Play className="mr-2 h-4 w-4 fill-white" />
                Compare Code
            </Button>

            <Button 
                size="lg" 
                onClick={onClear} 
                variant="destructive"
                className="min-w-[200px] cursor-pointer"
            >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear
            </Button>
        </div>
    );
}