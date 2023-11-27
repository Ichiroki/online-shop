// import axios from "axios"
// import { atom, useRecoilState } from "recoil"

// export const authenticatedUserState = atom({
//   key: "authUser",
//   default: null,
// })

// export const authenticatedUserLogoutState = atom({
//   key: 'authLogout',
//   default: ''
// })

// export const useLogin = async () => {
//   const [authUser, setAuthUser] = useRecoilState(authenticatedUserState)

//   try {
//     const handleLogin = async ({email, password, csrfToken}) => {
//       const response = await axios.post('/login', {
//         email, password, csrfToken
//       }, {
//         withCredentials: true
//       })
//       setAuthUser(response.data)
//       localStorage.setItem('authenticated', response.data)
//       window.location.href = '/'
//     }
//   } catch(e) {
//     console.log("Internal server error, please wait " + e)
//   }

//   return { handleLogin, setAuthUser }

// }
