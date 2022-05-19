import { LayoutMarkdown } from "./LayoutMarkdown"

const text = `
## Closed beta
> Unfortunately Prioratus is a closed beta now. Please email the author to be allowed
`

export function PageClosedBeta() {
    return <LayoutMarkdown text={text} />
}
