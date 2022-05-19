import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { TimeFormatted } from "components"
import { capitalizeFirstLetter } from "utils"
import { Hora } from "./types"

export function HoraCol({ hora, isActive }: { hora: Hora, isActive: boolean }) {
    return <Col className="hora">
        <h1 className={isActive ? "" : "text-secondary"}>
            {capitalizeFirstLetter(hora.name)}
            <span className="text-secondary ms-2 me-2"><sup><TimeFormatted date={hora.time} /></sup></span>
            {isActive && (<Button size="sm">Módl się</Button>)}
        </h1>
        <ul className={isActive ? "" : "text-secondary"}>
            <li className="my-3"><input type="checkbox" disabled={!isActive} className="me-1" /> <a href="#" className={isActive ? "" : "text-secondary"}>Zjeść posiłek</a></li>
            <li className="my-3"><input type="checkbox" disabled={!isActive} className="me-1" /> <a href="#" className={isActive ? "" : "text-secondary"}>Zrobić trening</a></li>
            <li className="my-3"><Button size="sm" variant="outline-secondary">+ Dodaj</Button></li>
        </ul>
    </Col >
}

