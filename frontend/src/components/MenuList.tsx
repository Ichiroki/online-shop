// MenuList.tsx
import { Button, Card, Col, Row, Spinner } from "react-bootstrap"
import useCart from "../app/function/CartFunction"
import { useMenu } from "../app/function/MenuFunction"
import formatCurrency from "../app/utilities/formatCurrency"
import React from "react"

function MenuList() {

  const getAuthUser = localStorage.getItem('authenticated')
  const {menus, loading} = useMenu()
  const { handleAddToCart } = useCart()
  const parsedUser = JSON.parse(getAuthUser ?? "null") 

  return (
    <Row md={2} xs={1} lg={3} className='g-3'>
      {loading ? (
        <Spinner animation='grow' variant='primary' className='mx-auto' />
      ) : (
        menus.map((item) => (
          <React.Fragment key={item.id}>
            <Col>
              <Card>
                <Card.Img variant='top' src={`public/imgs/${item.image}`} title={'Menu Image'}/>
                <Card.Body>
                  <Card.Title>
                    <Row>
                      <Col md={6}>
                        {item.name}
                      </Col>
                      <Col md={6} className="text-end">
                        {formatCurrency(item.price)}
                      </Col>
                    </Row>
                    </Card.Title>
                  <Card.Text>{item.desc}</Card.Text>
                  <Button
                    id="addItemToOrder"
                    type="button"
                    variant='primary'
                    onClick={() => handleAddToCart(parsedUser.id, item.id, 1)}
                    value="Order"
                    title={`Add new items to auth user cart`}
                    >
                    Order
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </React.Fragment>
        ))
      )}
    </Row>
  )
}

export default MenuList
