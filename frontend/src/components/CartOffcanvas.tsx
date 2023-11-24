import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Col, Offcanvas, Row, Stack } from "react-bootstrap"
import { cartState, useCart } from "../store/ShoppingCartStore"
import { useRecoilState } from "recoil"
import formatCurrency from "../utilities/formatCurrency"

type ProductsType = {
  id: string
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
  const [quantity, setQuantity] = useState<number>(0)
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const { addToCart, deleteFromCart } = useCart()

  const calculateTotalPrice = () => {
    return carts.reduce((total, c) => total + c.products.price * c.quantity, 0)
  }

  const getCartsData = async () => {
    try {
      const response = await axios.get("/api/cart")
      setCarts(response.data)
      setQuantity(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getCartsData()
  }, [])

  useEffect(() => {
    setTotalPrice(calculateTotalPrice())
  }, [carts])

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
          <Stack direction='vertical' gap={3}>
            {carts && carts.length > 0 ? (
              <>
                {carts.map((c) => (
                  <Row key={c.id}>
                    <Col md={4}>
                      <img src={`public/imgs/${c.products.image}`} width='105' />
                    </Col>
                    <Col md={4}>
                      <p style={{ fontSize: ".9rem", marginBottom: ".3rem" }}>
                        {c.products.name}
                      </p>
                      <p style={{ fontSize: ".9rem", marginBottom: ".3rem" }}>
                        {c.quantity} x
                      </p>
                      <p style={{ fontSize: ".9rem", marginBottom: ".3rem" }}>
                        {c.products.price * c.quantity}
                      </p>
                    </Col>
                    <Col md={4} gap={2}>
                      <Button
                        type='button'
                        variant='danger'
                        style={{ marginLeft: ".5rem" }}
                        onClick={() => deleteFromCart(c.users.id, c.products.id)}
                        title={`Decrease ${c.products.name} in ${c.users.name}'\s quantity`}>
                        -
                      </Button>
                      <Button
                        type='button'
                        variant='success'
                        style={{ marginLeft: ".5rem" }}
                        onClick={() => addToCart(c.users.id, c.products.id, c.quantity)}
                        title={`Increase ${c.products.name} in ${c.users.name}'\s quantity`}>
                        +
                      </Button>
                    </Col>
                  </Row>
                ))}
                <hr />
                <Stack>
                  <Row style={{ fontSize: "1.4rem" }}>
                    <Col md={9}>Total : {formatCurrency(totalPrice)}</Col>
                    <Col md={2}>
                      <Button variant='primary'>Order</Button>
                    </Col>
                  </Row>
                </Stack>
              </>
            ) : (
              <p>Your cart is empty</p>
            )}
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default CartOffcanvas
