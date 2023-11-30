import { Button, Col, FloatingLabel, Row, Stack } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import { FaStar } from 'react-icons/fa';
import { Form } from 'react-bootstrap';

function MenuRatingModal(props) {
    return (
        <>
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Give this menu rating
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Rating</Form.Label>
                            <br/>
                            {[...Array(5)].map((_, index) => (
                                <FaStar
                                key={index}
                                size={18}
                                style={{ color: '#e4e5e9' }}
                                />
                            ))}
                        </Form.Group>
                        <FloatingLabel
                        controlId="floatingTextarea"
                        label="Feedback"
                        className="mb-3"
                        >
                            <Form.Control as="textarea" placeholder="Leave a feedback here" style={{ height: '100px' }} />
                        </FloatingLabel>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Row>
                        <Col>
                            <Button onClick={props.onHide}>Close</Button>
                        </Col>
                        <Col>
                            <Button variant="success" onClick={props.onHide}>Submit</Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MenuRatingModal;