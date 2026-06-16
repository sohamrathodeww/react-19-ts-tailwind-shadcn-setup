interface Props {
    onCompare: () => void;
}

export default function CompareActions({
    onCompare,
}: Props) {
    return (
        <div className="flex justify-center">
            <button onClick={onCompare} className="rounded-md border px-6 py-2" >Compare</button>
        </div>
    )
}