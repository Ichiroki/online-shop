import { useRecoilValueLoadable } from "recoil"
import MenuList from "../components/MenuList"
// import { menuState, useMenu } from "../store/MenuStore"
import { useEffect } from "react"
import TopNavbar from "../components/TopNavbar"
import { Container } from "react-bootstrap"

function Menu() {
  // const menus = useRecoilValueLoadable(menuState)
  // const { fetchMenu } = useMenu()

  // useEffect(() => {
  //   fetchMenu()
  // }, [])

  return (
    <>
      <TopNavbar />
      <Container className='mb-4'>
        <h1>Menu</h1>
        {/* {menus.state === "hasValue" && } */}
        <MenuList />
      </Container>
    </>
  )
}

export default Menu
