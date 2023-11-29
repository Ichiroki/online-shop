import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/ReactToastify.min.css'
import { RecoilRoot } from "recoil"
import App from "./App"

axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <App />
        <ToastContainer />
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
)
