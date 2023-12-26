import { Button, Card, Col, Container, Row } from "react-bootstrap"
import TopNavbar from "../components/Layout/TopNavbar"
import { useMenu } from "../app/function/MenuFunction"
import { NavLink } from "react-router-dom"

function Home() {

  const {menus} = useMenu()

  return (
    <>
      <TopNavbar />
      <Container>
        <h1>Home</h1>
        <hr />
        <h3>Our Menu</h3>
        <Row className="mt-1 g-5">
          {menus.slice(0, 4).map((menu) => (
            <>
              <Col>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={`/imgs/${menu.image}`} />
                  <Card.Body>
                    <Card.Title>{menu.name}</Card.Title>
                    <Card.Text>
                      {menu.desc}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </>
          ))}
        </Row>
        <NavLink to="/menu"></NavLink>
      </Container>
    </>
  )
}

export default Home
