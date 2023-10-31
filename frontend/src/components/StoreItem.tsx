import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import formatCurrency from "../utilities/formatCurrency"
import axios from "axios"
import { useEffect, useState } from "react"

type StoreItemProps = {
  id: string
  name: string
  price: number
  desc: string
}

export function StoreItem({ id, name, price, desc }: StoreItemProps) {

  const [menus, setMenus] = useState({})
  const getMenu = async () => {
    const response = await axios.get('http://localhost:3000/api/menu')
    setMenus(response.data)
  }

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart()
  const quantity = getItemQuantity(id)

  useEffect(() => {
    getMenu()
  }, [])

  return (
    <Card className="h-100" border="primary">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-4 d-flex justify-content-between align-items-baseline">
          <span>{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <img style={{objectFit: "cover", height: "100", width: "250"}} src="http://source.unsplash.com/random/250x175/?coffee" />
        <div className="mt-auto">
          <p>{desc}</p>
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromCart(id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}