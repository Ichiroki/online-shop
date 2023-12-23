import { Col, Container, Row } from "react-bootstrap";
import TopNavbar from "../components/Layout/TopNavbar";
import RatingTabs from "../components/Rating/RatingTabs";

function Rating() {
    return (
        <>
            <TopNavbar/>
            <Container>   
            <h1>Feedback</h1>
            <hr/>
                <Row className="mt-3">
                    <Col lg={4}></Col>
                    <Col xs={12} lg={8}>
                        <RatingTabs/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Rating