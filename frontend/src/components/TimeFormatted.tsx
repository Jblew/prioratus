export function TimeFormatted({ date }: { date: Date }) {
    return <>{date.toISOString().substring(11, 16)}</>
}