import { PrismaClient } from '@prisma/client'
import { Request } from 'express';
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const authMiddleware = async (req: Request, res, next) => {
  const token = req.cookies.accessToken;
  // check json web token exists & is verified
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

export const checkUser = async (req, res, next) => {
  const token = req.cookies.accessToken;

  // check json web token exists & is verified
  try {
    if (token) {
      jwt.verify(token, 'accessToken', async (err, decodedToken) => {
          if (err) {
            res.locals.authenticated = null
            next()
          } else {
            let user = await prisma.users.findFirst({
              where: {
                id: decodedToken.id
              }
            })
            res.locals.authenticated = user
            next()
          }
        }
      )
    } else {
      res.locals.authenticated = null
      next()
    }
  } catch(err) {
    console.log('storing information failed')
    next()
  }
}