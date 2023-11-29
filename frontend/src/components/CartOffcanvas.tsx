import { useState } from "react"
import { Button, Offcanvas, Stack } from "react-bootstrap"
import useCart from "../app/function/CartFunction"
import MenuInCart from "./MenuInCart"

function CartOffcanvas() {

  const [show, setShow] = useState(false)

  const { carts } = useCart()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button
        id="cart-offcanvas"
        variant='outline-light'
        onClick={handleShow}
        className='rounded-circle'
        title={`Open Cart Canvas`}
        >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='18'
          height='18'
          fill='currentColor'
          className='bi bi-cart'
          viewBox='0 0 16 16'>
          <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2' />
        </svg>
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack direction="vertical" gap={3}>
                {carts && carts.length > 0 ? (
                  <>
                    <MenuInCart menu={carts}/>
                  </>
                ) : (
                  <>
                    <h1>There's no item in your cart</h1>
                  </>
                )}
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default CartOffcanvas
