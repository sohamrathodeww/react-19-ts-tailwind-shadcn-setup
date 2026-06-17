// --ts-ignore
import Editor from "@monaco-editor/react";
import { formatCode } from "../../services/codeFormatter.service";

interface Props {
    value:string;
    onChange: (value: string) => void;
    language?: string;
}

export default function CodeEditor({
    value,
    onChange,
    language = "javascript"
}: Props) {
    
    const handleEditorMount = (
        editor: any
        ) => {
            editor.onDidPaste(async () => {
                const currentValue =
                editor.getValue();

                const formatted =
                await formatCode(
                    currentValue
                );

                editor.setValue(formatted);

                onChange(formatted);
            });
        };
    return (
        <Editor
        height="500px"
        language={language}
        value={value}
        theme="vs-light"
        onChange={(value) => 
            onChange(value || ``)
        }
        options ={{
            minimap: {
                enabled: false
            },
            fontSize: 14,
            wordWrap: "on",
            automaticLayout: true
        }}
        onMount={handleEditorMount}
        />
    )
}