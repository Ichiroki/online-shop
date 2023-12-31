import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.min.css"
import { RecoilRoot } from "recoil"
import App from "./App"
import "./index.css"
import "tailwindcss/tailwind.css"
import SSRProvider from 'react-bootstrap/SSRProvider';

axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <SSRProvider>
          <App />
          <ToastContainer />
        </SSRProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
)
