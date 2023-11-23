import { atom, useRecoilState } from "recoil"
import axios from "axios"

type ProductsType = {
  id: string
  name: string,
  price: number,
  image: string
}

interface CartItem {
  id: string
  quantity: number
  products: ProductsType[]
}

export const cartState = atom<CartItem[]>({
  key: "cardState",
  default: [],
})

export function useCart() {
  const [carts, setCarts] = useRecoilState(cartState)

  const getCartsData = async () => {
    try {
      await fetch('http://localhost:3000/api/cart', {
        method: 'GET',
        credentials: 'include'
      })
      .then((res) => res.json())
      .then((data) => setCarts(data))
    } catch (error) {
      console.error(error)
    }
  }

  return {carts, getCartsData}
}
