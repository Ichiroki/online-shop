import axios from "axios"
import { useState } from "react"
import { Nav, Stack } from "react-bootstrap"
import { ZodError } from "zod"
import { NavLink, useHref, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function Signup() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confPassword, setConfPassword] = useState("")

  const [nameErr, setNameErr] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [passwordErr, setPasswordErr] = useState("")
  const [confPasswordErr, setConfPasswordErr] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("/signup", {
        name,
        email,
        password,
        confPassword,
      })

      if (response.data.success && response.status === 201) {
        navigate("/login")

        toast.success("You are registered")
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (
          err.response &&
          err.response.data.error &&
          err.response.data.error.fieldErrors !== null
        ) {
          const nameError = err.response.data.error.fieldErrors.name
          const emailError = err.response.data.error.fieldErrors.email
          const passwordError = err.response.data.error.fieldErrors.password
          const confPasswordError =
            err.response.data.error.fieldErrors.confPassword

          setNameErr(nameError)
          setEmailErr(emailError)
          setPasswordErr(passwordError)
          setConfPasswordErr(confPasswordError)
        }
      } else if (e instanceof ZodError) {
        console.log("Internal server error, please wait " + err)
      } else {
        console.error("Unexpected error occurred:", err)
      }
    }
  }

  return (
    <>
      <div className='row'>
        <div className='mx-auto mt-3 col-md-6'>
          <div className='mb-3 card'>
            <div className='shadow card-body'>
              <h5 className='text-center uppercase fw-semibold card-title'>
                Signup
              </h5>
              <div className='card-text'>
                <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <label htmlFor='name' className='form-label'>
                      Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      className='form-control'
                      id='name'
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                    {nameErr && <p className='text-danger'>{nameErr}</p>}
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                      Email address
                    </label>
                    <input
                      type='email'
                      name='email'
                      className='form-control'
                      id='email'
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    {emailErr && <p className='text-danger'>{emailErr}</p>}
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label htmlFor='password' className='form-label'>
                          Password
                        </label>
                        <input
                          type='password'
                          name='password'
                          className='form-control'
                          id='password'
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                        {passwordErr && (
                          <p className='text-danger'>{passwordErr}</p>
                        )}
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label htmlFor='confPassword' className='form-label'>
                          Confirm Password
                        </label>
                        <input
                          type='password'
                          name='confPassword'
                          className='form-control'
                          id='confPassword'
                          onChange={(e) => setConfPassword(e.target.value)}
                          value={confPassword}
                        />
                        {confPasswordErr && (
                          <p className='text-danger'>{confPasswordErr}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <Stack gap={3} direction='horizontal'>
                    <button type='submit' className='btn btn-success'>
                      Submit
                    </button>
                    <p className='ms-auto'>
                      Already Registered ?
                      <Nav.Link to='/login' as={NavLink}>Login</Nav.Link>
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

export default Signup
