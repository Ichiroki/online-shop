import { atom, selector, DefaultValue } from 'recoil'

interface CartItem {
    id: string
    quantity: number
}

export const cartState = atom<CartItem[]>({
    key: 'cardState',
    default: []
})

export const addToCartState = selector({
    key: 'addToCartState',
    set: ({set}, newItem) => {
        if(!(newItem instanceof DefaultValue)) {
            set(cartState, (prevCart) => [...prevCart, newItem])
        }
    },
    get: ({get}) => {
        const cart = get(cartState)
        return cart
    }
})