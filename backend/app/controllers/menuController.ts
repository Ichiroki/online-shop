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

export const addRating = async (userId: string, productId: string, rating: number, feedback: string) => {
   var today = new Date().toISOString();

   try {
      const product = await prisma.products.findUnique({
         where: {
            id: productId
         }
      })
      const user = await prisma.users.findUnique({
         where: {
            id: userId
         }
      })

      if(!product || !user) {
         throw new Error('Product or user tidak ditemukan')
      }

      await prisma.productrating.create({
         data: {
            productId,
            userId,
            rating,
            feedback,
            created_at: today
         }
      })
   } catch(e) {
      console.log("Internal server error, please wait " + e)
      throw e
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