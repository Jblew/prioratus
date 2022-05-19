import { LayoutMarkdown } from "./LayoutMarkdown"

const text = `
# Finally home

No place like home
`

export function PageDays() {
    return <LayoutMarkdown text={text} />
}
