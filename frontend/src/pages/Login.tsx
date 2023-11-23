import axios from "axios"
import { useState } from "react"
import { useRecoilState } from "recoil"
import cryptoRandomString from "crypto-random-string"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [csrfToken, setCsrfToken] = useState(
    cryptoRandomString({ length: 32, type: "url-safe" }),
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('/login', {
        email, password, csrfToken
      }, {
        withCredentials: true
      })
      const parsedData = JSON.stringify(response.data.user)
      console.log(parsedData)
      localStorage.setItem('authenticated', parsedData)
      window.location.href = '/'
    } catch(e) {
      console.log("Internal server error, please wait " + e)
    }
  }

  return (
    <>
      <div className='row'>
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
                  <button type='submit' className='btn btn-success'>
                    Login
                  </button>
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