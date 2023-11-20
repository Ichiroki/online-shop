import { useRecoilValueLoadable } from "recoil"
import MenuList from "../components/MenuList"
import { menuState, useMenu } from "../store/MenuStore"
import { useEffect } from "react"

function Menu() {
  const menus = useRecoilValueLoadable(menuState)
  const { fetchMenu, menu } = useMenu()

  useEffect(() => {
    fetchMenu()
  }, [])

  useEffect(() => {
    if(menus.state === 'hasValue') {
      console.log(menus.contents)
    }
  }, [menus])

  return (
    <>
      <h1>Menu</h1>
      {menus.state === 'hasValue' && <MenuList/>}
    </>
  )
}

export default Menu