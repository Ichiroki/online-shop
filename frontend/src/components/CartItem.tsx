import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from '../data/items.json'
import formatCurrency from "../utilities/formatCurrency"
import axios from "axios"
import { useEffect, useState } from "react"

type CartItemProps = {
   id: string,
   name: string, 
   price: number
   quantity: number
}


function CartItem({id, quantity}: CartItemProps) {
   const {removeFromCart, cartItems} = useShoppingCart()
   const item = storeItems.find(i => i.id === id)

   if(item == null) return null

   return (
      <>
         <Stack direction="horizontal" gap={3}>

         <div className="me-auto">
            <div>
               {item.name} {quantity > 1 && <span className="text-muted" style={{ fontSize: ".65rem" }}>x {quantity} </span>}
            </div>
            <div className="text-muted" style={{ fontSize: '.75rem' }}>{formatCurrency(item.price)}</div>
         </div>
         <div>{formatCurrency(item.price * quantity) }</div>
         <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(id)}>X</Button>
         <div>
         </div>
            <div className="ms-auto fw-bold fs-5">
            </div>
         </Stack>
      </>
   );
}

export default CartItem;