// MenuList.tsx
import { Button, Card, Col, Row, Spinner } from "react-bootstrap"
import { useRecoilCallback } from "recoil"
import useCart from "../function/CartFunction"
import { useMenu } from "../function/MenuFunction"
import { cartState } from "../store/ShoppingCartStore"

function MenuList() {

  const getCart = useRecoilCallback(({snapshot}) => async () => {
    const cartStateMenu = snapshot.getLoadable(cartState)
    if(cartStateMenu.state === "hasValue") {
      return cartStateMenu.contents
    } else {
      return []
    }
  })

  const {menus, loading} = useMenu()
  const { handleAddToCart } = useCart(getCart)
  const getAuthUser = localStorage.getItem('authenticated')
  const parsedUser = JSON.parse(getAuthUser)

  return (
    <Row md={2} xs={1} lg={4} className='g-3'>
      {loading ? (
        <Spinner animation='grow' variant='primary' className='mx-auto' />
      ) : (
        menus.map((item) => (
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
                  onClick={() => handleAddToCart(parsedUser.id, item.id, item.quantity)}
                  value="Order"
                  title={`Add new items to auth user cart`}
                  >
                  Order
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  )
}

export default MenuList
