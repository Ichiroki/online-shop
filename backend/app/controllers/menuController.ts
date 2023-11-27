import { PrismaClient } from "@prisma/client"
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const menuGet = async (req, res, next) => {
   const token = req.cookies.accessToken

   try {
      const menus = await prisma.products.findMany()
      res.render('menu/menu', {
         menus,
         active: 'Menu',
         token
      })
   } catch(e) {
      console.log(e)
      next()
   }
}

// For API Only

export const menuGetAPI = async (req, res) => {
   try {
      const menus = await prisma.products.findMany()
      res.status(201).json(menus)
   } catch(e) {
      console.log(e)
   }
}

export default { menuGet, menuGetAPI }