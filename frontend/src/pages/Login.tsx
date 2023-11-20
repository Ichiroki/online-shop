import axios from "axios";
import { useContext, useState } from "react";

function Login() {

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const handleSubmit = async (e) => {
      e.preventDefault()

      try {
         const response = await axios.post("/login", {
            email,
            password
         }, { 
            withCredentials: true, 
            headers : {
               'Content-Type': 'application/json'
            }
         })

         if(response.data.token) {
            const data = response.data.user
            localStorage.setItem('authenticated', JSON.stringify(data))
            // setAuthenticatedUser(data)
            window.location.href = '/'
         }
      } catch(e) {
         console.log(e)
      }
   }

   return (
      <>
         <div className="row">
            <div className="mx-auto mt-3 col-md-6">
               <div className="mb-3 card">
                  <div className="shadow card-body">
                     <h5 className="text-center uppercase fw-semibold card-title">Login</h5>
                     <div className="card-text">
                        <form onSubmit={handleSubmit}>
                           <div className="mb-3">
                              <label htmlFor="email" className="form-label">Email address</label>
                              <input type="email" name="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                              {/* <div className="text-danger form-text">Email salah</div> */}
                           </div>
                           <div className="mb-3">
                              <label htmlFor="password" className="form-label">Password</label>
                              <input type="password" name="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                           </div>
                           <button type="submit" className="btn btn-success">Login</button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default Login;