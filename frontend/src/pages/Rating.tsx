import { Col, Container, ListGroup, Pagination, Row, Tab } from "react-bootstrap";
import TopNavbar from "../components/Layout/TopNavbar";
import FeedbackUser from "../components/Feedback/FeedbackUser";
import { useRecoilValue } from "recoil";
import { authenticatedUserState } from "../app/store/AuthStore";
import { MenuRating } from "../app/types/Menu";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

function Rating() {

    const getUserData = useRecoilValue(authenticatedUserState)
    const [userRating, getUserRating] = useState<MenuRating[]>([])

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = userRating.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getRatingById = async () => {
        try {
            const response = await axios.get(`/api/rating/${getUserData.id}`)
            getUserRating(response.data)
        } catch(e) {
            console.error('404 | the data not found')
        }
    }

    useEffect(() => {
        getRatingById()
    }, [])

    return (
        <>
            <TopNavbar/>
            <Container className="pt-3"> 
            <h1>Inbox</h1>
            <hr />
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#getRate">
                    <Row>
                        <Col xs={12} md={4} xl={2} className="mb-3">
                            <ListGroup>
                                <ListGroup.Item action href="#getRate">
                                Feedback
                                </ListGroup.Item>
                                <ListGroup.Item action href="#link2">
                                Link 2
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col xs={12} md={8} xl={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="#getRate">
                                    {currentItems.map((rate) => (
                                    <FeedbackUser key={rate.id} rating={rate} />
                                    ))}
                                    {/* Tampilkan komponen Pagination */}
                                    <Pagination>
                                    {[...Array(Math.ceil(userRating.length / itemsPerPage)).keys()].map(
                                        (number) => (
                                        <Pagination.Item
                                            key={number + 1}
                                            active={number + 1 === currentPage}
                                            onClick={() => paginate(number + 1)}
                                        >
                                            {number + 1}
                                        </Pagination.Item>
                                        )
                                    )}
                                    </Pagination>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link2">Tab pane content 2</Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </>
    );
}

export default Rating;