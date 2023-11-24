import axios from "axios"
import cryptoRandomString from "crypto-random-string"
import { useState } from "react"
import { Nav, Stack } from "react-bootstrap"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [csrfToken, setCsrfToken] = useState(
    cryptoRandomString({ length: 32, type: "url-safe" }),
  )

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
      console.log(parsedData)
      localStorage.setItem("authenticated", parsedData)
      window.location.href = "/"
    } catch (e) {
      console.log("Internal server error, please wait " + e)
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
                <form onSubmit={handleSubmit}>
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
