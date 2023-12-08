import { atom } from "recoil"
import { MenuRating, MenuType } from "../types/Menu"

export const menuDataState = atom<MenuType[]>({
  key: "menuData",
  default: [],
})

export const menuSearchState = atom({
  key: "menuSearch",
  default: "",
})

export const selectedCategoryMenu = atom({
  key: "menuCategory",
  default: "all",
})

export const menuFilterState = atom<MenuType[]>({
  key: "menuFilter",
  default: [],
})

export const menuRating = atom<MenuRating[]>({
  key: "menuRating",
  default: [],
})
