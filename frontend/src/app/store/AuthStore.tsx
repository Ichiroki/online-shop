import { atom } from "recoil"

export const authenticatedUserState = atom({
  key: "authenticatedUserState",
  default: JSON.parse(localStorage.getItem('authenticated') ?? 'null'),
})