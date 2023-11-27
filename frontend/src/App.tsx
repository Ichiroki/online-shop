import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import About from "./pages/About"
import { Container } from "react-bootstrap"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/menu' element={<Menu />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </>
  )
}

export default App
