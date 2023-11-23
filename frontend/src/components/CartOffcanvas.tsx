import { useState } from "react"
import { Button, Offcanvas, Stack } from "react-bootstrap"

function CartOffcanvas({cart}) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <Button variant='outline-dark' onClick={handleShow} className="rounded-circle">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
      </svg>
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Trolimu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack direction='vertical' gap={3}>
            {cart.map((c) => (
              <div key={c.id}>
                {c.id}
              </div>
            ))}
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default CartOffcanvas
