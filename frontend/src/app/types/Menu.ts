export type MenuType = {
    id: string
    name: string
    slug: string
    desc: string
    price: number
    image: string
    category: string
    quantity: number
    available: number
}

export type MenuTypeInCart = {
    id: string
    name: string
    price: number
    image: string
}

export type MenuDetails = {
    id: string
    name: string
    category: string
    desc: string
    price: number
    image: string
    available: boolean
    rating: number
}