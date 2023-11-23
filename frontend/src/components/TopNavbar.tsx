import axios from "axios";
import { Container, Nav, NavDropdown, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useCart } from "../store/ShoppingCartStore";
import CartOffcanvas from "./CartOffcanvas";

function TopNavbar() {
  const users = localStorage.getItem('authenticated')
  const user = users ? JSON.parse(users) : null

  const handleLogout = async () => {
    try {
      await axios.get('/logout')
      localStorage.removeItem('authenticated')
      window.location.href = "/login"
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <NavbarBs sticky='top' className='mb-3 shadow-sm' bg="primary" data-bs-theme="dark">
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
            {user ? 
              <>
                <Nav>
                  <NavDropdown
                    id="profile-nav"
                    title={user?.name}
                    menuVariant="dark"
                  >
                    <NavDropdown.Item href="#action/3.1">Dashboard</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Setting
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Wishlist</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <CartOffcanvas></CartOffcanvas>
              </>
            : 
              <>
                <Nav.Link to='/login' as={NavLink}>
                  Login
                </Nav.Link>
                <Nav.Link to='/signup' as={NavLink}>
                  Sign Up
                </Nav.Link>
              </>
            }
            

          </Nav>
        </Container>
      </NavbarBs>
    </>
  )
}
export default TopNavbar
