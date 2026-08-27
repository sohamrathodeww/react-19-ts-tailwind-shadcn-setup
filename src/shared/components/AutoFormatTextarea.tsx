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
      min-h-[640px]
      w-full
      resize-none
      rounded-2xl
      border
      border-white/10
      bg-white/3
      p-5
      font-mono
      text-sm
      outline-none
      transition-all
      duration-300
      placeholder:text-muted-foreground/60
      focus:border-primary/50
      focus:ring-2
      focus:ring-primary/20
      focus:bg-white/5
      shadow-inner
    "
  />
  );
}