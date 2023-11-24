import { atom, useRecoilState } from "recoil"
import axios from "axios"
import { useEffect } from "react"

interface MenuItem {
  id: string
  name: string
  desc: string
  price: number
  image: string
  quantity: number
  available: number
}

export const menuState = atom<MenuItem[]>({
  key: "menuState",
  default: [],
})

const loadingState = atom({
  key: "loading",
  default: true,
})

export function useMenu() {
  const [menu, setMenu] = useRecoilState(menuState)
  const [loading, setLoading] = useRecoilState(loadingState)
  
  const fetchMenu = async () => {
    setLoading(true)
    try {
      const response = await axios.get("/api/menu")
      setMenu(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(true)
    }
  }

  useEffect(() => {
    fetchMenu()
  }, [])

  return { menu, fetchMenu, loading }
}
