import { atom } from "recoil"
import { CartsType } from "../types/Cart"

export const cartState = atom<CartsType[]>({
  key: "cartState",
  default: [],
})

