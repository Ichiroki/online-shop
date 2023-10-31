import React, { ReactNode, createContext, useContext, useState } from 'react'
import ShoppingCart from '../components/ShoppingCart'
import useLocalStorage from '../hooks/useLocalStorage'

type ShoppingCartProviderProps = {
   children: ReactNode
}

type CartItem = {
   id: string
   quantity: number
}

type ShoppingCartContext = {
   openCart: () => void
   closeCart: () => void
   getItemQuantity: (id: string) => number,
   increaseCartQuantity: (id: string) => void
   decreaseCartQuantity: (id: string) => void
   removeFromCart: (id: string) => void
   cartQuantity: number
   cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
   return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children } : ShoppingCartProviderProps) {
   const [cartItems, setCartItem] = useLocalStorage<CartItem[]>("shopping-cart",[])
   const [isOpen, setIsOpen] = useState(false)

   const openCart = () => setIsOpen(true)
   const closeCart = () => setIsOpen(false)

   const cartQuantity = cartItems.reduce(
      (quantity, item) => item.quantity + quantity, 0
   )

   function getItemQuantity(id: string) {
      return cartItems.find(item => item.id === id)?.quantity || 0
   }

   function increaseCartQuantity(id: string) {
      setCartItem(currItems => {
         if(currItems.find(item => item.id === id) == null) {
            return [...currItems, {id, quantity: 1}]
         } else {
            return currItems.map(item => {
               if(item.id === id) {
                  return {...item, quantity: item.quantity + 1}
               } else {
                  return item
               }
            })
         }
      })
   }

   function decreaseCartQuantity(id: string) {
      setCartItem(currItems => {
         if(currItems.find(item => item.id === id)?.quantity === 1) {
            return currItems.filter(item => item.id !== id)
         } else {
            return currItems.map(item => {
               if(item.id === id) {
                  return {...item, quantity: item.quantity - 1}
               } else {
                  return item
               }
            })
         }
      })
   }

   function removeFromCart(id: string) {
      setCartItem(currItems => {
         return currItems.filter(item => item.id !== id)
      })
   }

   return (
      <ShoppingCartContext.Provider value={{ 
         getItemQuantity, 
         increaseCartQuantity, 
         decreaseCartQuantity, 
         removeFromCart,
         openCart,
         closeCart,
         cartItems,
         cartQuantity
      }}>
         {children}
         <ShoppingCart isOpen={isOpen} />
      </ShoppingCartContext.Provider>
   )
}