import { useEffect, useState } from "react"
import { MenuType } from "../types/Menu"
import axios from "axios"

export const useMenu = () => {
    const [menus, setMenus] = useState<MenuType[]>([])
    const [loading, setLoading] = useState(false)

    const getMenu = async () => {
        setLoading(true)
        try {
          const response = await axios.get("/api/menu")
          setMenus(response.data)
          setLoading(false)
        } catch (error) {
          console.log(error)
          setLoading(true)
        }
      }
    
      useEffect(() => {
        getMenu()
      }, [menus.length])

      return { menus, loading }
}