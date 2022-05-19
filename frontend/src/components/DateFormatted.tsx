export function DateFormatted({ date }: { date: Date }) {
    return <>{date.toISOString().substring(0, 10)}</>
}