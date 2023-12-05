import { useEffect, useState } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { FaStar } from 'react-icons/fa';
import { useMenu } from '../../app/function/MenuFunction';
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';
import { MenuRating } from '../../app/types/Menu';

function MenuRatingModal(props) {

    const [hoverRating, setHoverRating] = useState(0)
    const [selectedRating, setSelectedRating] = useState(0)

    const [feedback, setFeedback] = useState('')

    const addRating = async (userId: string, productId: string, rating: number, feedback: string) => {
        try {
            if(!rating) {
                toast.error("Please, give us a star", {
                  autoClose: 5000,
                  closeOnClick: true,
                  draggable: true,
                  hideProgressBar: false,
                  pauseOnHover: true,
                  position: "top-right",
                  progress: undefined,
                  theme: "light",
                  toastId: crypto.randomUUID(),
                  transition: Bounce
                })
            } else {
                toast.success("Thank you for your rating and feedback", {
                  autoClose: 5000,
                  closeOnClick: true,
                  draggable: true,
                  hideProgressBar: false,
                  pauseOnHover: true,
                  position: "top-right",
                  progress: undefined,
                  theme: "light",
                  toastId: crypto.randomUUID(),
                  transition: Bounce
                })

                props.onHide()
                
                return await axios.post("/add-rating", {
                    userId,
                    productId,
                    rating,
                    feedback
                })
            }
        } catch(e) {
          console.log(e)
        }
    }

    const authUser = localStorage.getItem('authenticated')

    const {menu} = props
    const userId = JSON.parse(authUser || "null").id

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
                                size={24}
                                style={{ color: index < (hoverRating || selectedRating) ? "ffc107" : '#e4e5e9', cursor: "pointer" }}
                                onMouseEnter={() => setHoverRating(index + 1)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setSelectedRating(index + 1)}
                                />
                            ))}
                            <span className="d-inline-block ms-3">{hoverRating || selectedRating}</span>
                        </Form.Group>
                        <FloatingLabel
                        controlId="floatingTextarea"
                        label="Feedback"
                        className="mb-3"
                        >
                            <Form.Control as="textarea" placeholder="Leave a feedback here" style={{ height: '100px' }} 
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            />
                        </FloatingLabel>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Row>
                        <Col>
                            <Button onClick={props.onHide}>Close</Button>
                        </Col>
                        <Col>
                            <Button variant="success" onClick={() => addRating(userId, menu.id, selectedRating, feedback)}>Submit</Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MenuRatingModal;