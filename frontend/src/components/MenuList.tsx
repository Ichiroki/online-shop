// MenuList.tsx
import axios from "axios"
import { Button, Card, Col, Row, Spinner } from "react-bootstrap"
import { useMenu } from "../store/MenuStore"

function MenuList() {
  const handleIncrement = async (productId) => {
    const getUser = localStorage.getItem("authenticated")
    if (getUser) {
      const userStringified = JSON.parse(getUser)
      try {
        await axios.post("http://localhost:3000/add-to-cart", {
          userId: userStringified.id,
          productId,
          quantity: 1,
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  const { menu, loading } = useMenu()
  return (
    <Row md={2} xs={1} lg={4} className='g-3'>
      {loading ? (
        <Spinner animation='grow' variant='primary' className="mx-auto" />
      ) : (
        menu.map((item) => (
          <Col key={item.id}>
            <Card>
              <Card.Img variant='top' src={`public/imgs/${item.image}`} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.desc}</Card.Text>
                <Button
                  variant='primary'
                  onClick={() => handleIncrement(item.id)}>
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
