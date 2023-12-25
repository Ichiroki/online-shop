import axios from "axios"
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import useCart from "../../app/function/CartFunction"
import { authenticatedUserState } from "../../app/store/AuthStore"
import CartOffcanvas from "../Cart/CartOffcanvas"
import InboxDropdown from "../Feedback/InboxDropdown"

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

  const { carts } = useCart()

  return (
    <>
      <Navbar
        sticky='top'
        className='mb-3 shadow-sm'
        bg='primary'
        data-bs-theme='dark'
        expand='lg'>
        <Container>
          <Navbar.Brand>Ichiroki</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
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
            {carts.length > 0 && <CartOffcanvas></CartOffcanvas>}
            <InboxDropdown/>
              {users ? (
                <>
                  <Nav className='me-2'>
                    <NavDropdown
                      id='profile-nav'
                      title={users?.name}
                      data-bs-theme='light'>
                      <NavDropdown.Item href='#action/3.1'>
                        Dashboard
                      </NavDropdown.Item>
                      <NavDropdown.Item href='#action/3.2'>
                        Setting
                      </NavDropdown.Item>
                      <NavDropdown.Item href='#action/3.2'>
                        Cart
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
export default TopNavbar
