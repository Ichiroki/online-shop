import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

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
  const token = req.cookies.accessToken;

  try {
    if (token) {
      jwt.verify(token, 'accessToken', async (err, decodedToken) => {
        if (err) {
          res.locals.authenticated = null;
        } else {
          let user = await prisma.users.findFirst({
            where: {
              id: decodedToken.id
            }
          });
          res.locals.authenticated = user;
          next();
        }
      });
    } else {
      res.locals.authenticated = null;
      next();
    }
  } catch(err) {
    console.log('storing information failed');
    next();
  }
};