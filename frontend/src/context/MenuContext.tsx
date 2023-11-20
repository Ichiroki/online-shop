import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface MenuItem {
    id: number
    name: string
    desc: string
    price: number
    image: string
    available: number
}

interface MenuContextProps {
    menu: MenuItem[]
}

const MenuContext = createContext<MenuContextProps>({menu: []})

const MenuProvider = ({children}: any) => {
    const [menu, setMenu] = useState([])

    const getMenu = async () => {
        try {
            const response = await axios.get('/api/menu')
            setMenu(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getMenu()
    }, [])

    return (
        <MenuContext.Provider value={{ menu }}>
            {children}
        </MenuContext.Provider>
    )
}

export {MenuContext, MenuProvider}