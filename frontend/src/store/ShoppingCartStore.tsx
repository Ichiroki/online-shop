import { atom, useRecoilState } from "recoil";
import axios from "axios";

type ProductsType = {
  id: string;
  name: string;
  price: number;
  image: string;
};

interface CartItem {
  id: string;
  quantity: number;
  products: ProductsType;
}

export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
});

export function useCart() {
  const [cartItems, setCartItems] = useRecoilState(cartState);

  const addToCart = async (userId: number, productId: number, quantity: number) => {
    try {
      const response = await axios.post('/add-to-cart', {
        userId, productId, quantity
      });

      const updatedCartItems = cartItems.map((item) => {
        if (item.id === productId.toString()) {
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
        }
        return item;
      });

      setCartItems(updatedCartItems);
    } catch(e) {
      console.log(e);
    }
  }

  const deleteFromCart = async (userId: number, productId: number) => {
    try {
      const response = await axios.post('/delete-from-cart', {
        userId, productId
      });

      setCartItems(response.data)
    } catch(e) {
      console.log(e);
    }
  }

  return { addToCart, deleteFromCart };
}