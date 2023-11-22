import { atom, useRecoilState } from 'recoil';
import axios from 'axios';

interface MenuItem {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
  available: number;
}

export const menuState = atom<MenuItem[]>({
  key: 'menuState',
  default: [],
});

export const loadingState = atom({
  key: 'loading',
  default: true
})

export function useMenu() {
  const [menu, setMenu] = useRecoilState(menuState)
  const [loading, setLoading] = useRecoilState(loadingState)

  const fetchMenu = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3000/api/menu');
      setMenu(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(true)
    }
  };

  return { menu, fetchMenu, loading };
}