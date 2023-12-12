// cartFunction.ts
import axios from "axios";
import { useEffect } from "react";
import { Bounce, toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { authenticatedUserState } from "../store/AuthStore";
import { cartState } from "../store/ShoppingCartStore";
import { CartsType } from "../types/Cart";

const useCart = () => {
  const [carts, setCarts] = useRecoilState<CartsType[]>(cartState)

  const users = useRecoilValue(authenticatedUserState)

  if(users) { 
    const getCartsData = async () => {
      try {
        const response = await axios.get('/api/cart')
        setCarts(response.data)
      } catch(e) {
        console.error(e)
      }
    }

    useEffect(() => {
      getCartsData()
    }, [carts.length])
  }


  const addToCart = async (
    userId: string,
    productId: string,
    quantity: number,
  ) => {
    try {
      const newItem = { userId, productId, quantity } // Create the new item object

      const existingItem = carts.find(
        (item) => item.products?.id === newItem.productId,
      )

      if (existingItem?.quantity) {
        // If the item already exists in the cart, update the quantity
        const updatedCart = carts.map((item) =>
          item.products?.id === newItem.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )

        setCarts(updatedCart)

        await axios.post("/add-to-cart", newItem)
      } else {
        // If the item is not in the cart, add it to the cart
        const newItem: CartsType = { userId, productId, quantity }

        toast.success("This menu added to your cart", {
          autoClose: 5000,
          closeOnClick: true,
          draggable: true,
          hideProgressBar: false,
          pauseOnHover: true,
          position: "top-right",
          progress: undefined,
          theme: "light",
          toastId: crypto.randomUUID(),
          transition: Bounce,
        })

        setCarts([...carts, newItem])

        await axios.post("/add-to-cart", newItem)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const deleteFromCart = async (userId: string, productId: string) => {
    try {
      const deletedItem = { userId, productId }
      const existingItem = carts.find(
        (item) => item.products?.id === deletedItem.productId,
      )

      if (existingItem) {
        if (existingItem.quantity > 1) {
          const updatedCart = carts.map((item) =>
            item.products?.id === deletedItem.productId
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          setCarts(updatedCart)

          await axios.post("/delete-from-cart", deletedItem)
        } else {
          const updatedCart = carts.filter(
            (item) => item.products?.id !== productId,
          )
          setCarts(updatedCart)

          await axios.post("/delete-from-cart", { userId, productId })
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleAddToCart = async (userId, productId, quantity) => {
    await addToCart(userId, productId, quantity)
  }

  const handleDeleteFromCart = async (userId, productId) => {
    await deleteFromCart(userId, productId)
  }

  return {
    carts,
    handleAddToCart,
    handleDeleteFromCart,
    addToCart,
    deleteFromCart,
  }
}

export default useCart
