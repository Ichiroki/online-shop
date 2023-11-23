import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Col, Offcanvas, Row, Stack } from "react-bootstrap"
import { useCart } from "../store/ShoppingCartStore"

type ProductsType = {
  name: string
  price: number
  image: string
}

type UsersType = {
  id: string
  name: string
  email: string
}

type CartsType = {
  id: number
  quantity: number
  products: ProductsType
  users: UsersType
}

function CartOffcanvas() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [carts, setCarts] = useState<CartsType[]>([])

  const {addToCart} = useCart()

  const getCartsData = async () => {
    try {
      const response = await axios.get('/api/cart')
      setCarts(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getCartsData()
  }, [])

  return (
    <>
      <Button variant='outline-light' onClick={handleShow} className="rounded-circle">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
      </svg>
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack direction='vertical' gap={3}>
            {carts.map((c) => (
              <Row key={c.id}>
                <Col md={4}>
                    <img src={`public/imgs/${c.products.image}`} width="105"/>
                </Col>
                <Col md={4}>
                    <p style={{ fontSize: '.9rem', marginBottom: '.3rem' }}>{c.products.name}</p>
                    <p style={{ fontSize: '.9rem', marginBottom: '.3rem' }}>{c.quantity} x</p>
                    <p style={{ fontSize: '.9rem', marginBottom: '.3rem' }}>{c.products.price * c.quantity}</p>
                </Col>
                <Col md={4} gap={2}>
                    <Button variant="danger" style={{ marginLeft: '.5rem' }}>-</Button>
                    <Button variant="success" style={{ marginLeft: '.5rem' }}>+</Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default CartOffcanvas
