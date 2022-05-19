import Col from "react-bootstrap/Col"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { DateFormatted } from "components"

export function NavigationCol({ date }: { date: Date }) {
    return <Col>
        <Navbar bg="dark" variant="dark">
            <Container className="px-2">
                <Col>
                    <Button variant="outline-secondary" size="sm">
                        &laquo; Wczoraj
                    </Button>
                </Col>
                <Col className="text-center">
                    <Navbar.Brand className="text-center me-0"><DateFormatted date={date} /></Navbar.Brand>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button variant="outline-secondary" size="sm">
                        Jutro &raquo;
                    </Button>
                </Col>
            </Container>
        </Navbar>
    </Col>
}
