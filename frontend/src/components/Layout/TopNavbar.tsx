import axios from "axios"
import { Container, Dropdown, DropdownMenu, DropdownToggle, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import useCart from "../../app/function/CartFunction"
import { authenticatedUserState } from "../../app/store/AuthStore"
import CartOffcanvas from "../Cart/CartOffcanvas"

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
              <Nav>
                <Dropdown data-bs-theme="light">
                  <DropdownToggle className="me-2" id="dropdown-rating">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                    </svg>
                  </DropdownToggle>
                  <DropdownMenu align="end">
                    <Dropdown.Item href="#/action-1">Chat</Dropdown.Item>
                    <Dropdown.Item as={NavLink} to={`/rating/${users.id}`}>Rating</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Help Center</Dropdown.Item>
                  </DropdownMenu>
                </Dropdown>
              </Nav>
            {carts.length > 0 && <CartOffcanvas></CartOffcanvas>}
              {users ? (
                <>
                  <Nav className='me-2'>
                    <NavDropdown
                      id='profile-nav'
                      title={users?.name}
                      menuVariant='light'
                      data-bs-theme='light'>
                      <NavDropdown.Item href='#action/3.1'>
                        Dashboard
                      </NavDropdown.Item>
                      <NavDropdown.Item href='#action/3.2'>
                        Setting
                      </NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to={`/cart/${users.id}`}>
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
