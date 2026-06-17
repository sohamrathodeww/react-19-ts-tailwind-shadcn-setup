import { Card } from "../../../components/ui/card";
import AutoFormatTextarea from "../../../shared/components/AutoFormatTextarea";


interface Props {
    originalCode: string;
    compareCode: string;

    onOriginalCodeChange: (value: string) => void;
    onCompareCodeChange: (value: string) => void;
}



export default function CompareEditors({
    originalCode,
    compareCode,
    onOriginalCodeChange,
    onCompareCodeChange,
}: Props) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
                
                <h3 className="mb-3 font-medium">
                    Original Code
                </h3>
                <AutoFormatTextarea
                value={originalCode}
                onChange={onOriginalCodeChange}
                placeholder="Original Code"
                />


                 {/* <textarea value={originalCode} onChange={(e) => onOriginalCodeChange(e.target.value)} placeholder="Original Code" className="h-80 rounded-md border p-3" /> */}
                
                
            </Card>

            <Card className="p-4">
                
                <h3 className="mb-3 font-medium">
                    Compare Code
                </h3>
                <AutoFormatTextarea
                    value={compareCode}
                    onChange={onCompareCodeChange}
                    placeholder="Compare Code"
                />
                   
                {/* <textarea value={compareCode} onChange={(e) => onCompareCodeChange(e.target.value)} placeholder="Compare Code" className="h-80 rounded-md border p-3" /> */}
                
            </Card>
        </div>
    )
}