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
        <label>
            <input type="file" hidden onChange={handleUpload} />
            <Button variant="outline" size="sm" asChild>
                <span>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                </span>
            </Button>
        </label>
    )
}