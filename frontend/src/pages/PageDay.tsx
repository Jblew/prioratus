import { useParams } from "react-router-dom"
import { LayoutMarkdown } from "./LayoutMarkdown"


export function PageDay() {
    let { date } = useParams()
    const text = `
# Finally home

Page of day ${date}

No place like home
`
    return <LayoutMarkdown text={text} />
}
