import { MenuType, MenuTypeInCart } from "./Menu"
import { UsersType } from "./User"

export type CartsType = {
    id: number
    quantity: number
    products: MenuTypeInCart
    users: UsersType
}

export type AddNewItem = {
    quantity: number
    userId: string
    productId: string
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