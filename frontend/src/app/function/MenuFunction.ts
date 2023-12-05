import axios from "axios"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { menuDataState, menuRating } from "../store/MenuStore"
import { MenuType } from "../types/Menu"

export const useMenu = () => {
    const [menus, setMenus] = useRecoilState(menuDataState)
    const [loading, setLoading] = useState(false)
    const [rating, setRating] = useRecoilState(menuRating)

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

    const getRating = async () => {
      try {
        const response = await axios.get('/api/rating')
        setRating(response.data)
      } catch(e) {
        console.log("Internal server error, please wait " + e)
      }
    }

    useEffect(() => {
      getMenu()
      getRating()
    }, [])

    return { menus, loading, searchQuery, searchResult, rating, setMenus, setSearchQuery, handleSearch }
}