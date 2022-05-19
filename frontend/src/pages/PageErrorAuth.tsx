import { LayoutMarkdown } from "./LayoutMarkdown"

const text = `
# Auth error

Sorry for the error. Please contact the author.
`

export function PageErrorAuth() {
    return <LayoutMarkdown text={text} />
}