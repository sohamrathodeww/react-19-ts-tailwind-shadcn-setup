import { autoFormatContent } from "../services/codeFormatter.service";


interface Props {
  value: string;
  onChange: (
    value: string
  ) => void;
  placeholder?: string;
}

export default function AutoFormatTextarea({
  value,
  onChange,
  placeholder,
}: Props) {
  const handlePaste = async (
    e: React.ClipboardEvent<
      HTMLTextAreaElement
    >
  ) => {
    e.preventDefault();

    const pastedText =
      e.clipboardData.getData(
        "text"
      );

    const formatted =
      await autoFormatContent(
        pastedText
      );

    onChange(formatted);
  };

  return (
    <textarea
      value={value}
      onChange={(e) =>
        onChange(
          e.target.value
        )
      }
      onPaste={handlePaste}
      placeholder={placeholder}
      className="h-[500px] w-full rounded-md border p-3 font-mono"
    />
  );
}