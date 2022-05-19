import { useParams } from "react-router-dom"
import { Layout } from "./Layout"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import { DateFormatted } from "components"

export function PageDay() {
    let { date } = useParams()

    return <Layout>
        <Row>
            <Col className="text-center mb-1">
                <i>Dzień pierwszy</i>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col>
                <Navbar bg="dark" variant="dark">
                    <Container className="d-flex justify-content-between">
                        <Nav>
                            <Button variant="outline-secondary" style={{ width: "100px" }} size="sm">
                                &laquo; Wczoraj
                            </Button>
                        </Nav>
                        <Navbar.Brand className="text-center me-0"><DateFormatted iso={date} /></Navbar.Brand>
                        <Nav>
                            <Button variant="outline-secondary" style={{ width: "100px" }} size="sm">
                                Jutro &raquo;
                            </Button>
                        </Nav>
                    </Container>
                </Navbar>
            </Col>
        </Row>
        <Row className="mb-5">
            <Col>
                <h2><span className="text-secondary">Laudes <sup>7:00</sup></span></h2>
            </Col>
        </Row>
        <Row className="mb-5">
            <Col>
                <h2><span className="text-secondary">Tertia <sup>9:00</sup></span></h2>
            </Col>
        </Row>
        <Row className="mb-5">
            <Col>
                <h2>
                    Sexta
                    <span className="text-secondary me-2"><sup>12:00</sup></span>
                    <Button size="sm">Módl się</Button></h2>
                <InputGroup className="mb-3">
                    <InputGroup.Checkbox />
                    <Button>Zjeść posiłek</Button>
                </InputGroup>
                <ul>
                    <li><input type="checkbox" /> <Button size="sm" variant="link">Zjeść posiłek</Button></li>
                    <li><input type="checkbox" /> <u>Zrobić trening</u></li>
                    <li><Button size="sm" variant="outline-secondary">+ Dodaj</Button></li>
                </ul>
            </Col>
        </Row>
        <Row className="mb-5">
            <Col>
                <h2>Nona <span className="text-secondary">15:00</span></h2>
            </Col>
        </Row>
        <Row className="mb-5">
            <Col>
                <h2>Vespera <span className="text-secondary">18:00</span></h2>
            </Col>
        </Row>
        <Row className="mb-5">
            <Col>
                <h2>Completorium <span className="text-secondary">21:00</span></h2>
            </Col>
        </Row>
    </Layout>
}

