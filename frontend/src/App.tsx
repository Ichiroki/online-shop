import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Menu from "./pages/Menu"
import MenuDetail from "./pages/MenuDetail"
import Rating from "./pages/Rating"
import Signup from "./pages/Signup"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/menu' element={<Menu />}></Route>
        <Route path='/menu/:slug' element={<MenuDetail />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/rating/:id' element={<Rating />}/>
      </Routes>
    </>
  )
}

export default App
