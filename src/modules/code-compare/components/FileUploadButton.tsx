import { Button } from "../../../components/ui/button";
import { AlertCircle, Upload } from "lucide-react";
import { validateCompareFile } from "../services/fileValidation.service";
import { readFileContent } from "../services/fileReader.service";
import { toast } from "sonner";

interface Props {
    onFileLoaded: (
        content: string
    ) => void;
}

export default function FileUploadButton({
    onFileLoaded,
}: Props) {

    const handleUpload = async(
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if(!file) {
            return;
        }

        const validationError = validateCompareFile(file);
        console.log(`validationError >>> `, validationError);
        if(validationError) {
            toast.error(validationError,{
                icon: <AlertCircle className="h-4 w-4" />,
            });
            return;
        }

        try {
            const content = await readFileContent(file);

            onFileLoaded(content);

        } catch (error:unknown) {
            if(error instanceof Error) {
                toast.error(error?.message || `Unable to read file`,{
                    icon: <AlertCircle className="h-4 w-4" />,
                });
            }
        }
    }
    return (
        <label className="cursor-pointer">
            <input type="file" hidden onChange={handleUpload} />
            <Button variant="outline" size="sm" asChild className="cursor-pointer">
                <span>
                    <Upload className="mr-1.5 h-3.5 w-3.5" />
                    Upload
                </span>
            </Button>
        </label>
    )
}