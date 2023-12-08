import { MenuType, MenuTypeInCart } from "./Menu"
import { UsersType } from "./User"

export type CartsType = {
  id?: number
  quantity: number
  productId: string
  userId: string
  products?: MenuTypeInCart
  users?: UsersType
}

export type AddNewItem = {
  id?: number
  quantity: number
  userId?: string
  productId?: string
  products?: MenuTypeInCart
  users?: UsersType
}

export interface AddToCart {
  id: ""
  userId: UsersType
  productId: MenuType
  quantity: number
}

export interface CartItem {
  id: string
  quantity: number
  userId: UsersType
  productId: MenuType
}
