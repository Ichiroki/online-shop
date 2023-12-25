import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import TopNavbar from "../components/Layout/TopNavbar";
import RatingTabs from "../components/Inbox/Rating/RatingTabs";
import { useState } from "react";

function Rating() {
    const [activeTab, setActiveTab] = useState("feedback")

    const handleTabChange = (tab) => {
        setActiveTab(tab)
    }

    return (
        <>
            <TopNavbar/>
            <Container>   
            <h1>Feedback</h1>
            <hr/>
                <Row className="mt-3">
                    <Col lg={4}>
                        <ListGroup>
                            <ListGroupItem>
                            Inbox
                            </ListGroupItem>
                            <ListGroupItem action href="#link1" active={activeTab === "chat"}>
                            Chat
                            </ListGroupItem>
                            <ListGroupItem action href="#feedback" active={activeTab === "feedback"}>
                            Feedback
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col xs={12} lg={8}>
                        <RatingTabs activeTab={activeTab}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Rating