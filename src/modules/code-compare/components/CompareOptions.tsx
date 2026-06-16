
interface Props {
  ignoreWhitespace: boolean;
  onIgnoreWhitespaceChange: (
    checked: boolean
  ) => void;
}
export default function CompareOptions({ 
    ignoreWhitespace, 
    onIgnoreWhitespaceChange
}: Props) {
    return (
        <div className="flex items-center gap-3">
            <input type="checkbox" checked={ignoreWhitespace} onChange={(e) => onIgnoreWhitespaceChange(e.target.checked)}/>
            <span> Ignore White Space</span>
        </div>
    )
}