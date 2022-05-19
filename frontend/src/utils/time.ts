export function isoTimeToDate(timeISO: string) {
    return new Date(new Date().toISOString().substring(0, 10) + "T" + timeISO + "Z")
}