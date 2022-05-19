import { LayoutSingle } from "./Layout"
import ReactMarkdown from 'react-markdown'

export function LayoutMarkdown({ text }: { text: string }) {
    return <LayoutSingle>
        <ReactMarkdown children={text} />
    </LayoutSingle>
}
