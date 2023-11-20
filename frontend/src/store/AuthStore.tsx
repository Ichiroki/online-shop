// import axios from 'axios'
// import { selector } from 'recoil'
// import Login from '../pages/Login'

// const authUser = selector({
//     key: 'authenticated',
//     get: async ({get}) => {
//         let user = null

//         try {
//             let {data} = await axios.post("/login", {
//                 email,
//                 password
//              }, { 
//                 withCredentials: true, 
//                 headers : {
//                    'Content-Type': 'application/json'
//                 }
//              })
//              user = {user: data}
//         } catch(e) {
//             user = {user: e.message}
//         }
//     }
// })

// export default authUser