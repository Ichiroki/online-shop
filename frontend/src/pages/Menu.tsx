import { Col, Container, Form, Row } from "react-bootstrap"
import { useRecoilState } from "recoil"
import { menuSearchState } from "../app/store/MenuStore"
import TopNavbar from "../components/Layout/TopNavbar"
import MenuList from "../components/Menu/MenuList"

function Menu() {

  const [searchTerm, setSearchTerm] = useRecoilState(menuSearchState)
  return (
    <>
      <TopNavbar />
      <Container className='mb-4'>
        <Row>
          <Col>
            <h1>Menu</h1>
          </Col>
          <Col>
            <Form className="ms-auto">
                <Form.Group>
                  <Form.Control 
                    type="text"
                    placeholder="Search Menu"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
              </Form>
          </Col>
        </Row>
        <hr/>
        <MenuList searchTerm={searchTerm}/>
      </Container>
    </>
  )
}

export default Menu
