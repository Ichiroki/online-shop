// MenuList.tsx
import { Button, Card, Col, Row, Spinner } from "react-bootstrap"
import { useMenu } from "../store/MenuStore"
import { useCart } from "../store/ShoppingCartStore"

function MenuList() {

  const { addToCart } = useCart()
  const {menu, loading} = useMenu()  
  const getAuthUser = localStorage.getItem('authenticated')
  const parsedUser = JSON.parse(getAuthUser)

  return (
    <Row md={2} xs={1} lg={4} className='g-3'>
      {loading ? (
        <Spinner animation='grow' variant='primary' className='mx-auto' />
      ) : (
        menu.map((item) => (
          <>
            <Col key={item.id}>
              <Card>
                <Card.Img variant='top' src={`public/imgs/${item.image}`} title={'Menu Image'}/>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.desc}</Card.Text>
                  <Button
                    id="addItemToOrder"
                    type="button"
                    variant='primary'
                    onClick={() => addToCart(parsedUser.id, item.id, item.quantity)}
                    value="Order"
                    title={`Add new items to auth user cart`}
                    >
                    Order
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </>
        ))
      )}
    </Row>
  )
}

export default MenuList
