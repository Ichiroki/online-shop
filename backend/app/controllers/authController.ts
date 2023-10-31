import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { ZodError } from 'zod'
import { LoginUser, RegisterUser } from '../../prisma/validation/userRequest'
import { hashPassword } from '../utils/password'

const prisma = new PrismaClient()

// app/create json web token
const expiresIn = Date.now() + 8 * 3600000
const createToken = (id: string) => {
  return jwt.sign({id}, 'accessToken', {
    expiresIn: expiresIn
  });
};

// controller actions
export const signup_get = (req, res) => {
  res.render('auth/signup', {
    active: 'Signup'
  });
}

export const login_get = (req, res) => {
  res.render('auth/login', {
    active: 'Login'
  });
}

export const signup_post = async (req, res) => {
  try {
    // validate the data

    const dataUser = await RegisterUser.parseAsync(req.body)

    let hashedPassword = await hashPassword(dataUser.password)
    console.log(dataUser);

    let user = await prisma.users.create({
      data: {
        // using random uuid as an id for Users
        id: crypto.randomUUID(),
        name: dataUser.name,
        email: dataUser.email,
        password: hashedPassword  // password
      }
    })

    res.status(302).json({user, success: true, error: null})
  } catch(e) {
    if(e instanceof ZodError) {
      res.status(400).json({success: false, error: e.flatten()})
    } else {
      throw e
    }
  }
}

export const login_post = async (req, res) => {
  const {email, password} = req.body

  try {
      const auth = await LoginUser.spa(req.body)

      if(!auth.success) {
        res.status(401).json({error: auth.error.flatten().fieldErrors})
      } else {
        const user = await prisma.users.findFirst({
          where: {
            email: auth.data.email
          }
        })

        if(!user) {
          res.status(401).json({
            error: {
              email: 'Email salah',
            }
          })
        } else {
          const comPw = await bcrypt.compare(password, user.password)

          if(!comPw) {
            res.status(401).json({
              error: {
                password: 'Password salah'
              }
            })
          } else {
            const token = createToken(user.id)

            res.cookie('accessToken', token, {
              httpOnly: true,
              expire: '1h',
              secure: true,
            })
        
            res.status(200).json({user, message: "Login sukses", token})
          }
        }
      }
    } catch (e) {
      if(e instanceof ZodError) {
      res.status(400).json({ message: "Login gagall",  error: e.flatten()});
    }
  }
}

export const logout_get = (req, res) => {
  res.cookie('accessToken', '', { maxAge: 1 });
  res.redirect('/');
}

export default { signup_get, signup_post, login_get, login_post, logout_get }