import { FormEvent, useState } from "react"
import { Nav, Stack } from "react-bootstrap"

function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confPassword, setConfPassword] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await fetch("/signup", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          name,
          email,
          password,
          confPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data) => {
        console.log(data)
        window.location.href = "/login"
      })
    } catch (e) {
      console.log(e)
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
                      </div>
                    </div>
                  </div>
                  <Stack gap={3} direction='horizontal'>
                    <button type='submit' className='btn btn-success'>
                      Submit
                    </button>
                    <p className='ms-auto'>
                      Already Registered ?
                      <Nav.Link href='/login'>Login</Nav.Link>
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
