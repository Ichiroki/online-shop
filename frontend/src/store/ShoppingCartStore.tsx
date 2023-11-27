import { atom, selector } from "recoil"
import { CartsType } from "../types/Cart"

export const cartState = atom<CartsType[]>({
  key: "cartState",
  default: [],
})

export const totalPrice = selector({
  key: "totalPrice",
  get: ({get}) => {
      const cartItems = get(cartState)

      const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
          return total + item.products.price * item.quantity
        }, 0)
      }

      return calculateTotalPrice()
  }
})