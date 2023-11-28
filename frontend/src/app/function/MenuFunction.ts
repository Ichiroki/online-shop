import axios from "axios"
import { useEffect, useState } from "react"
import { MenuType } from "../types/Menu"

export const useMenu = () => {
    const [menus, setMenus] = useState<MenuType[]>([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResult, setSearchResult] = useState<MenuType[]>([])

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
    
    const handleSearch = () => {
      const results = menus.filter(menu => menu.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setSearchResult(results)
    }

    useEffect(() => {
      getMenu()
    }, [])

    return { menus, loading, searchQuery, searchResult, setSearchQuery, handleSearch }
}