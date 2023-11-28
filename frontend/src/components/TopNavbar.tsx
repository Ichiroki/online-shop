import axios from "axios"
import {
  Container,
  Nav,
  NavDropdown,
  Navbar as NavbarBs,
} from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import useCart from "../app/function/CartFunction"
import { authenticatedUserState } from "../app/store/AuthStore"
import CartOffcanvas from "./CartOffcanvas"

function TopNavbar() {
  const users = useRecoilValue(authenticatedUserState)
  const loggedIn = useSetRecoilState(authenticatedUserState)

  const handleLogout = async () => {
    try {
      await axios.get("/logout")
      loggedIn(null)
      localStorage.removeItem("authenticated")
      window.location.href = "/"
    } catch (e) {
      console.log(e)
    }
  }

  const {carts} = useCart()

  return (
    <>
      <NavbarBs
        sticky='top'
        className='mb-3 shadow-sm'
        bg='primary'
        data-bs-theme='dark'>
        <Container>
          <Nav className='me-auto'>
            <Nav.Link to='/' as={NavLink}>
              Home
            </Nav.Link>
            <Nav.Link to='/menu' as={NavLink}>
              Menu
            </Nav.Link>
            <Nav.Link to='/about' as={NavLink}>
              About
            </Nav.Link>
          </Nav>
          <Nav>
            {users ? (
              <>
                <Nav>
                  <NavDropdown
                    id='profile-nav'
                    title={users?.name}
                    menuVariant='dark'
                    data-bs-theme='light'>
                    <NavDropdown.Item href='#action/3.1'>
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item href='#action/3.2'>
                      Setting
                    </NavDropdown.Item>
                    <NavDropdown.Item href='#action/3.3'>
                      Wishlist
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                {carts.length > 0 && (
                <CartOffcanvas></CartOffcanvas>
                )}
              </>
            ) : (
              <>
                <Nav.Link to='/login' as={NavLink}>
                  Login
                </Nav.Link>
                <Nav.Link to='/signup' as={NavLink}>
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </NavbarBs>
    </>
  )
}
export default TopNavbar
