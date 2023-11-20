import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";

function CartOffcanvas({cartItems}) {

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Trolimu
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Trolimu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                {cartItems.length > 0 ? (
                    <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                    </ul>
                ) : (
                    <p>Trolimu kosong.</p>
                )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default CartOffcanvas;