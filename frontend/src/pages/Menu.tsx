import MenuList from "../components/MenuList"
// import { menuState, useMenu } from "../store/MenuStore"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import TopNavbar from "../components/TopNavbar"
import { useMenu } from "../app/function/MenuFunction"

function Menu() {

  return (
    <>
      <TopNavbar />
      <Container className='mb-4'>
        <h1>Menu</h1>
        <MenuList/>
      </Container>
    </>
  )
}

export default Menu
