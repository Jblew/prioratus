import { LayoutMarkdown } from "./LayoutMarkdown"

const text = `
# Welcome to Prioratus

## Closed beta
> Unfortunately this is a closed beta now. Please email the author to be allowed
`

export function PageIntroduction() {
    return <LayoutMarkdown text={text} />
}
