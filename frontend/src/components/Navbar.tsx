import { useState } from "react"
import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { authenticatedUserState } from "../store/AuthStore"
import CartOffcanvas from "./CartOffcanvas"

function Navbar() {
  const [cartItems, setCartItems] = useState([])
  const users = useRecoilValue(authenticatedUserState)

  return (
    <>
      <NavbarBs sticky="top" className="mb-3 bg-white shadow-sm">
        <Container>
          <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink}>
              Home
            </Nav.Link>
            <Nav.Link to="/menu" as={NavLink}>
              Menu
            </Nav.Link>
            <Nav.Link to="/about" as={NavLink}>
              About
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link to="/login" as={NavLink}>
              Login
            </Nav.Link>
            <Nav.Link to="/signup" as={NavLink}>
              Sign Up
            </Nav.Link>
            <CartOffcanvas cartItems={cartItems}></CartOffcanvas>
          </Nav>
        </Container>
      </NavbarBs>
    </>
  )
}
export default Navbar