import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
// import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { Container } from "react-bootstrap";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return ( 
    <>
      <Navbar />
        <Container className="mb-4">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/menu" element={<Menu />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Routes>
        </Container>
    </>
   );
}

export default App;