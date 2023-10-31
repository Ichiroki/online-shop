import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import { useEffect, useState } from "react"
import axios from "axios"

function Menu() {
  const [menus, setMenus] = useState<any[]>([])

  const getMenus = async () => {
    const response = await axios.get('http://localhost:3000/api/menu')
    setMenus(response.data)
  }

  useEffect(() => {
    getMenus()
  }, [])

  return (
    <>
      <h1>Menu</h1>
      <Row md={2} xs={1} lg={4} className="g-3">
        {menus.map(menu => (
          <Col key={menu.id}>
            <StoreItem name={menu.name} id={menu.id} price={menu.price} desc={menu.desc}/>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Menu