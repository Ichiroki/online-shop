import axios from "axios"
import { useEffect, useState } from "react"
import { MenuType } from "../types/Menu"
import { menuDataState, menuRating } from "../store/MenuStore"
import { useRecoilState } from "recoil"
import { Bounce, toast } from "react-toastify"

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

    const handleRatingChange = async (userId: string, productId: string, rating: number, feedback: string) => {
      try {
        await axios.post("/add-rating", {
          userId,
          productId,
          rating,
          feedback
        })

      } catch(e) {
        console.log("Internal server error, please wait " + e)
      }
    }

    const getRating = async () => {
      try {
        const response = await axios.get('/api/rating')
        setRating(response.data)
      } catch(e) {
        console.log("Internal server error, please wait " + e)
      }
    }

    const addRating = async (userId: string, productId: string, rating: number, feedback: string) => {
      try {
        await axios.post('/add-rating', {
          userId,
          productId,
          rating,
          feedback
        })

        toast.success("Thank you for your rating and feedback", {
          autoClose: 5000,
          closeOnClick: true,
          draggable: true,
          hideProgressBar: false,
          pauseOnHover: true,
          position: "top-right",
          progress: undefined,
          theme: "light",
          toastId: crypto.randomUUID(),
          transition: Bounce
        })
      } catch(e) {
        console.log(e)
      }
    }

    useEffect(() => {
      getMenu()
      getRating()
    }, [])

    return { menus, loading, searchQuery, searchResult, rating, setMenus, setSearchQuery, handleSearch, handleRatingChange, addRating }
}