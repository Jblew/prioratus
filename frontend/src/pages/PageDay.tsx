import { useParams } from "react-router-dom"
import { LayoutSingle } from "./Layout"
import { BreviaryDay } from "breviaryday"
import { LayoutMarkdown } from "./LayoutMarkdown"

export function PageDay() {
    let { date } = useParams()
    if (!date) {
        return <LayoutMarkdown text={"# Missing date"} />
    }
    const dateObj = new Date(date)
    return <LayoutSingle>
        <BreviaryDay date={dateObj} />
    </LayoutSingle>
}

