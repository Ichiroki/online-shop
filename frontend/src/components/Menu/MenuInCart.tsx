import React, { useEffect, useState } from "react"
import { Button, Col, Row, Stack } from "react-bootstrap"
import useCart from "../../app/function/CartFunction"
import formatCurrency from "../../app/utilities/formatCurrency"
import { NavLink } from "react-router-dom"

function MenuInCart({ menu }) {
  const { handleAddToCart, handleDeleteFromCart } = useCart()
  const users = localStorage.getItem('authenticated')

  const parsedUser = JSON.parse(users ?? "null")

  const [total, setTotal] = useState(0)

  const getTotal = () => {
    const allQtyTotal = menu.reduce((total, item) => {
      return total + item.products?.price * item.quantity
    }, 0)
    setTotal(allQtyTotal)
  }

  useEffect(() => {
    getTotal()
  }, [menu])

  return (
      <>
        {menu ? (
          <>
          {menu.map((m) => (
            <>
              <Row className='' key={m.id}>
                <Col xs={4}>
                  <img src={`/imgs/${m.products?.image}`} width='105' className="border rounded" />
                </Col>
                <Col xs={4}>
                  <p style={{ fontSize: ".9rem", marginBottom: ".3rem" }}>
                    {m.products?.name}
                  </p>
                  <p style={{ fontSize: ".9rem", marginBottom: ".3rem" }}>
                    {m.quantity} x
                  </p>
                  <p style={{ fontSize: ".9rem", marginBottom: ".3rem" }}>
                    {m.products?.price * m.quantity}
                  </p>
                </Col>
                <Col gap={2} xs={4} className="align-items-center d-flex">
                  <Button
                    type='button'
                    variant='danger'
                    style={{ marginLeft: ".5rem" }}
                    onClick={() => handleDeleteFromCart(m.users.id, m.products.id)}
                    title={`Decrease quantity`}>
                    -
                  </Button>
                  <Button
                    type='button'
                    variant='success'
                    style={{ marginLeft: ".5rem" }}
                    onClick={() =>
                      handleAddToCart(m.users.id, m.products.id, m.quantity)
                    }
                    title={`Increase quantity`}>
                    +
                  </Button>
                </Col>
              </Row>
            </>
            ))}
            <NavLink to={`/cart/${parsedUser.id}`} className="btn btn-primary mt-2">Lihat Selengkapnya</NavLink>
            <hr />
            <Stack>
              <Row style={{ fontSize: "1.4rem" }}>
                <Col xs={9}>
                  Total : {isNaN(total) ? "Invalid Total" : formatCurrency(total)}
                </Col>
                <Col xs={2}>
                  <Button variant='primary'>Order</Button>
                </Col>
              </Row>
            </Stack>
          </>
        ) : (
          <h1>There is no menu in your cart</h1>
        )}
      </>     
  )
}

export default MenuInCart
