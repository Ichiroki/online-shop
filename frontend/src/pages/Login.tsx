import { FormEvent, useEffect, useState } from "react";

function Login() {


   const [token, setToken] = useState(null)

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const target = e.target as HTMLFormElement
      const email = target.email.value
      const password = target.password.value

      try {
         await fetch("http://localhost:3000/login", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: JSON.stringify({
               email,
               password
            }),
            headers: {
               "Content-Type": "application/json",
            },
         }).then((data) => {
            console.log(data)
            window.location.href = '/' 
         })
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
                           <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp"/>
                           <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                           <label htmlFor="password" className="form-label">Password</label>
                           <input type="password" name="password" className="form-control" id="password"/>
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