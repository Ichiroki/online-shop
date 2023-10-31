import React from 'react'

function Navbar({isLogged}) {
   return (
      <>
         <nav className="navbar navbar-expand-lg fixed-top" data-bs-theme="dark" style={{ background: "#48382A" }}>
            <div className="container">
               <a className="navbar-brand" href="#">
               <img src="/coffee.png" alt="" width="50px"/>
               Ninja Coffees
               </a>
               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarNav">
               <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                     <a className="nav-link" aria-current="page" href="/">Home</a>
                  </li>
                  <li className="nav-item dropdown">
                     <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                     Order
                     </a>
                     <ul className="dropdown-menu">
                     <li><a className="dropdown-item" href="/menu">Menu</a></li>
                     <li><a className="dropdown-item" href="/cart">Cart</a></li>
                     </ul>
                  </li>
                  { isLogged ? (
                     <>
                        <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                           Mirai
                        </a>
                        <ul className="dropdown-menu">
                           <li className="dropdown-item-text">mirai@gmail.com</li>
                           <li><hr className="dropdown-divider"/></li>
                           <li><a className="dropdown-item" href="#">Dashboard</a></li>
                           <li><a className="dropdown-item" href="#">Setting</a></li>
                           <li><a className="dropdown-item" href="/logout">Logout</a></li>
                        </ul>
                        </li>
                     </>
                  ) : (
                     <>
                     <li className="nav-item">
                        <a className="nav-link" href="/login">Log in</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link btn" href="/signup">Sign up</a>
                        </li>
                     </>
                  )}
               </ul>
               </div>
            </div>
         </nav>
      </>
   );
}

export default Navbar;