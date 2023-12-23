import { Route, Routes } from "react-router-dom"
import About from "./pages/About"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Menu from "./pages/Menu"
import MenuDetail from "./pages/MenuDetail"
import Signup from "./pages/Signup"
import UserCart from './pages/UserCart'
import Rating from "./pages/Rating"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/menu/:slug' element={<MenuDetail />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/cart/:id" element={<UserCart/>} />
        <Route path="/rating/:id" element={<Rating/>} />
      </Routes>
    </>
  )
}

export default App
