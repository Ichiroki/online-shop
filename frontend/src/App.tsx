import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import About from "./pages/About"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import MenuDetail from "./pages/MenuDetail"
import UserCart from "./pages/UserCart"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/menu' element={<Menu />}></Route>
        <Route path='/menu/:slug' element={<MenuDetail />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path="/cart/:id" element={<UserCart/>}></Route>
      </Routes>
    </>
  )
}

export default App
