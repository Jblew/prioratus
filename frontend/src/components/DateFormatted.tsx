export function DateFormatted({ date, iso }: { date?: Date, iso?: string }) {
    const dateObj = date || iso ? new Date(iso!) : new Date()
    return <>{dateObj.toISOString().substring(0, 10)}</>
}