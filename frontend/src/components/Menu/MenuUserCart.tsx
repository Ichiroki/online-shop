import React, { useEffect, useState } from "react"
import useCart from "../../app/function/CartFunction"
import { Button, Col, Row, Stack } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import formatCurrency from "../../app/utilities/formatCurrency"

function MenuUserCart({menu}) {
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
      <div>
        {menu.map((m) => (
          <React.Fragment key={m.id}>
            <Row className='mt-3'>
              <Col xs={4}>
                <img src={`/imgs/${m.products?.image}`} width='105' className="mx-auto d-block"/>
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
              <Col gap={2} xs={4} className="d-flex align-items-center justify-content-center">
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
          </React.Fragment>
        ))}
        <hr />
        <Stack>
          <Row style={{ fontSize: "1.4rem" }}>
            <Col xs={9}>
              Total : {isNaN(total) ? "Invalid Total" : formatCurrency(total)}
            </Col>
            <Col xs={3} className="d-flex align-items-center justify-content-center">
              <Button variant='primary' className="mx-auto">Order</Button>
            </Col>
          </Row>
        </Stack>
      </div>
    )
}

export default MenuUserCart;