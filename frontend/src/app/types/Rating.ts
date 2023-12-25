import { MenuType } from "./Menu"
import { UsersType } from "./User"

export type RatingType = {
    id: number,
    productId: string,
    userId: string,
    rating: number,
    feedback: string,
    create_at: Date
    products: MenuType
    users: UsersType
}