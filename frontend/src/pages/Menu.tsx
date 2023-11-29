import { Container, Stack } from "react-bootstrap"
import MenuList from "../components/MenuList"
import TopNavbar from "../components/TopNavbar"
import { useRecoilState } from "recoil"
import { menuSearchState } from "../app/store/MenuSearchStore"
import { Form } from "react-bootstrap"

function Menu() {

  const [searchTerm, setSearchTerm] = useRecoilState(menuSearchState)

  return (
    <>
      <TopNavbar />
      <Container className='mb-4'>
        <Stack direction="horizontal" >
          <h1>Menu</h1>
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
        </Stack>
        <MenuList searchTerm={searchTerm}/>
      </Container>
    </>
  )
}

export default Menu
