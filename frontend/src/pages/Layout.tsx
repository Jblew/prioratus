import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export function Layout({ children }: { children: React.ReactNode }) {
    return <Container>
        {children}
    </Container>
}

export function LayoutSingle({ children }: { children: React.ReactNode }) {
    return <Container>
        <Row>
            <Col>
                {children}
            </Col>
        </Row>
    </Container>
}