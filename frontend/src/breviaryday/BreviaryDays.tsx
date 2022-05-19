import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import { isoTimeToDate } from "utils"
import { CountCol } from "./CountCol"
import { Hora } from "./types"
import { NavigationCol } from "./NagivationCol"
import { HoraCol } from "./HoraCol"
import { useEffect, useRef } from "react"

const horas: Hora[] = [
    { name: "Laudes", time: isoTimeToDate("07:00") },
    { name: "Tertia", time: isoTimeToDate("09:00") },
    { name: "Sexta", time: isoTimeToDate("12:00") },
    { name: "Nona", time: isoTimeToDate("15:00") },
    { name: "Vespera", time: isoTimeToDate("18:00") },
    { name: "Completorium", time: isoTimeToDate("21:00") },
]

export function BreviaryDay({ date }: { date: Date }) {
    const activeHora = getActiveHora(horas)
    const activeHoraRef = useRef(null)

    useEffect(() => {
        (activeHoraRef.current as any)?.scrollIntoView()
    }, [])

    return (
        <Container fluid className="mx-0 px-0 pt-2">
            <Row className="mb-3"><CountCol /></Row>
            <Row className="mb-4"><NavigationCol date={date} /></Row>
            {horas.map(hora => {
                const isActive = hora.name === activeHora.name
                return <Row key={hora.name} className="mb-5">
                    {isActive && (<span ref={activeHoraRef}></span>)}
                    <HoraCol hora={hora} isActive={isActive} />
                </Row>
            })}
        </Container>
    )
}

function getActiveHora(horas_: Hora[]) {
    const horas = [...horas_]
    horas.sort((a, b) => b.time.getTime() - a.time.getTime())
    const time = new Date().getTime()
    for (const hora of horas) {
        if (time > hora.time.getTime()) {
            return hora
        }
    }
    return horas[horas.length - 1]
}