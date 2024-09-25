import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import csrf from '../utils/csrf'

const prisma = new PrismaClient()

export const requireAuth = async (req, res, next) => {
  const token = req.cookies.accessToken

  try {
    if (token) {
      jwt.verify(token, 'accessToken', async (err, decodedToken) => {
          if (err) {
            res.redirect('/login')
          } else {
            next()
          }
        }
      )
    } else {
      res.redirect('/login')
    }
  } catch(err) {
    console.log('this cookies are not valid')
  }
}

export const ensureAuth = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}

export const checkUser = async (req, res, next) => {
  const token = req.cookies.accessToken

  try {
    if (token) {
      jwt.verify(token, 'accessToken', async (err, decodedToken) => {
        if (err) {
          res.locals.authenticated = null
          res.locals.csrf = null
        } else {
          let user = await prisma.users.findFirst({
            where: {
              id: decodedToken.id
            }
          });
          res.locals.csrf = csrf()
          res.locals.authenticated = user
          next();
        }
      })
    } else {
      res.locals.csrf = null
      res.locals.authenticated = null
      next()
    }
  } catch(err) {
    console.log('storing information failed')
    next()
  }
}