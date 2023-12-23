import axios from "axios"
import cryptoRandomString from "crypto-random-string"
import { useState } from "react"
import { Button, Col, Nav, Row, Stack } from "react-bootstrap"
import { useSetRecoilState } from "recoil"
import { ZodError } from "zod"
import { authenticatedUserState } from "../app/store/AuthStore"
import { NavLink } from "react-router-dom"

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
      console.log(parsedData)
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

          setEmail("")
          setPassword("")
          
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
                      <Nav.Link to='/signup' as={NavLink}>Signup</Nav.Link>
                    </p>
                  </Stack>
                  <Row>
                    <Col className="text-center" xs={12}>
                      <p>Or Login with</p>
                    </Col>
                    <Col>
                      <Row className="d-flex align-items-center justify-content-center">
                        <Col>
                          <Button variant="outline-success">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                            </svg>
                            <span className="ms-3">
                              Google
                            </span>
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
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