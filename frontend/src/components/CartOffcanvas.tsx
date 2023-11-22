import { useEffect, useState } from "react";
import { Button, Offcanvas, Stack } from "react-bootstrap";

function CartOffcanvas({children}) {

    const [carts, setCarts] = useState([])

    const getCartsData = async () => {
        try {
          const response = await fetch('http://localhost:3000/cart', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
          })
          .then((res) => res.json())
          .then((data) => setCarts(data))
        } catch (error) {
          console.log(error);
        }
    };

    useEffect(() => {
        getCartsData()
    }, [])

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
                    <Stack direction="horizontal" gap={3}>
                        {children}
                    </Stack>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default CartOffcanvas;