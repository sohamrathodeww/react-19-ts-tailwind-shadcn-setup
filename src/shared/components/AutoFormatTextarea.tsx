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
      onChange(e.target.value)
    }
    onPaste={handlePaste}
    placeholder={placeholder}
    spellCheck={false}
    className="
      min-h-[500px]
      w-full
      resize-none
      rounded-lg
      border
      bg-background
      p-4
      font-mono
      text-sm
      outline-none
      transition-colors

      focus:border-primary
      focus:ring-2
      focus:ring-primary/20
    "
  />
  );
}