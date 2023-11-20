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

export function useMenu() {
  const [menu, setMenu] = useRecoilState(menuState);

  const fetchMenu = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/menu');
      setMenu(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { menu, fetchMenu };
}