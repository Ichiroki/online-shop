import axios from "axios"
import cryptoRandomString from "crypto-random-string"
import { useState } from "react"
import { Nav, Stack } from "react-bootstrap"
import { useSetRecoilState } from "recoil"
import { ZodError } from "zod"
import { authenticatedUserState } from "../app/store/AuthStore"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [csrfToken, setCsrfToken] = useState(
    cryptoRandomString({ length: 32, type: "url-safe" }),
  )

  const [emailErr, setEmailErr] = useState("")
  const [passwordErr, setPasswordErr] = useState("")

  const setLoggedIn = useSetRecoilState(authenticatedUserState)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        "/login",
        {
          email,
          password,
          csrfToken,
        },
        {
          withCredentials: true,
        },
      )
      const parsedData = JSON.stringify(response.data.user)
      localStorage.setItem("authenticated", parsedData)
      setLoggedIn(parsedData)
      window.location.href = "/"
    } catch (e) {
      if (axios.isAxiosError(e)) {
        // Jika ini adalah AxiosError, coba lihat responsnya
        if (e.response) {
          console.error("Server responded with status", e.response.status);
          console.error("Error details:", e.response.data.error.email);

          const email = e.response.data.error.email
          const password = e.response.data.error.password
          
          setEmailErr(email)
          setPasswordErr(password)
        } else {
          console.error("Request failed before getting a response from the server");
        }
      } else if (e instanceof ZodError) {
        console.log("Internal server error, please wait " + e);
      } else {
        console.error("Unexpected error occurred:", e);
      }
    }
  }

  return (
    <>
      <div className='row h-100 d-flex align-items-center justify-content-center'>
        <div className='mx-auto mt-3 col-md-6'>
          <div className='mb-3 card'>
            <div className='shadow card-body'>
              <h5 className='text-center uppercase fw-semibold card-title'>
                Login
              </h5>
              <div className='card-text'>
                <form onSubmit={handleSubmit} noValidate>
                  <div className='mb-3'>
                    <input
                      type='hidden'
                      value={csrfToken}
                      onChange={(e) => setCsrfToken(e.target.value)}
                      style={{ display: "none" }}
                      readOnly
                    />
                    <label htmlFor='email' className='form-label'>
                      Email address
                    </label>
                    <input
                      type='email'
                      name='email'
                      className='form-control'
                      id='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailErr && (
                      <p className="text-danger">{emailErr}</p>
                    )}
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                      Password
                    </label>
                    <input
                      type='password'
                      name='password'
                      className='form-control'
                      id='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordErr && (
                      <p className="text-danger">{passwordErr}</p>
                    )}
                  </div>
                  <Stack gap={3} direction='horizontal'>
                    <button type='submit' className='btn btn-success'>
                      Login
                    </button>
                    <p className='ms-auto'>
                      Doesn't have an account ?
                      <Nav.Link href='/signup'>Signup</Nav.Link>
                    </p>
                  </Stack>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
