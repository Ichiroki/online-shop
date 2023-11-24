import axios from "axios"
import { atom, useRecoilState } from "recoil"

type ProductsType = {
  id: string
  name: string
  price: number
  image: string
}

interface CartItem {
  id: string
  quantity: number
  products: ProductsType
}

export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
})

export function useCart() {
  const [cartItems, setCartItems] = useRecoilState(cartState)

  const addToCart = async (userId: string, productId: string, quantity: number) => {
    try {
      const response = await axios.post("/add-to-cart", {
        userId,
        productId,
        quantity
      })

      // Pastikan bahwa server mengembalikan data item yang baru ditambahkan ke keranjang
      const newItem = response.data;

      // Periksa apakah item sudah ada di dalam keranjang
      const existingItem = cartItems.find(item => item.products.id === newItem.products.id);

      if (existingItem) {
        // Jika sudah ada, update quantity
        const updatedCart = cartItems.map(item =>
          item.products.id === newItem.products.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
        );
        setCartItems(updatedCart);
      } else {
        // Jika belum ada, tambahkan item baru ke dalam keranjang
        setCartItems([...cartItems, newItem]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const deleteFromCart = async (userId: string, productId: string) => {
    try {
      const response = await axios.post("/delete-from-cart", {
        userId,
        productId,
      });

      // Pastikan bahwa server mengembalikan data item yang baru dihapus dari keranjang
      const deletedItem = response.data;

      // Update keranjang dengan menghapus item yang sesuai
      const updatedCart = cartItems.filter(item => item.products.id !== deletedItem.products.id);
      setCartItems(updatedCart);
    } catch (e) {
      console.log(e);
    }
  }

  return { addToCart, deleteFromCart };
}
