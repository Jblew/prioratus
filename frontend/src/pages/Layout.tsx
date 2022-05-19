import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export function Layout({ children }: { children: React.ReactNode }) {
    return <Container className="pt-2 pt-md-3 pt-lg-5">
        {children}
    </Container>
}

export function LayoutSingle({ children }: { children: React.ReactNode }) {
    return <Layout>
        <Row>
            <Col>
                {children}
            </Col>
        </Row>
    </Layout>
}