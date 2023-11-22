import { atom } from 'recoil'

export const getUserData = () => {
    const user = localStorage.getItem('authenticated')
}

export const authenticatedUserState = atom({
    key: "authUser",
    default: "Fahrezi",
})