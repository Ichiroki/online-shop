import { UsersType } from "./User"

export type MenuType = {
    id: string
    name: string
    slug: string
    desc: string
    price: number
    image: string
    best_seller: boolean
    best_product: boolean
    category: string
    quantity: number
    available: number
    productrating: MenuRating[]
}

export interface MenuRating {
    id: number
    productId: string
    userId: number
    rating: number
    feedback: string
    created_at: Date
    products: MenuType
    users: UsersType
}

export type MenuTypeInCart = {
    id: string
    name: string
    price: number
    image: string
}

export interface MenuDetails {
    id: string
    name: string
    category: string
    desc: string
    price: number
    image: string
    available: boolean
    rating: number
    productrating: MenuRating
}