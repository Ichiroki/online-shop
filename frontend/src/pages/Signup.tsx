function Signup() {
   return (
      <>
         <div className="row">
            <div className="mx-auto mt-3 col-md-6">
               <div className="mb-3 card">
                  <div className="shadow card-body">
                     <h5 className="text-center uppercase fw-semibold card-title">Signup</h5>
                     <div className="card-text">
                     {/* onSubmit={handleSubmit} */}
                     <form >
                        <div className="mb-3">
                           <label htmlFor="name" className="form-label">Name</label>
                           <input type="text" name="name" className="form-control" id="name"/>
                        </div>
                        <div className="mb-3">
                           <label htmlFor="email" className="form-label">Email address</label>
                           <input type="email" name="email" className="form-control" id="email"/>
                        </div>
                        <div className="row">
                           <div className="col-md-6">
                              <div className="mb-3">
                                 <label htmlFor="password" className="form-label">Password</label>
                                 <input type="password" name="password" className="form-control" id="password"/>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="mb-3">
                                 <label htmlFor="confPassword" className="form-label">Confirm Password</label>
                                 <input type="password" name="confPassword" className="form-control" id="confPassword"/>
                              </div>
                           </div>
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

export default Signup;