import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const menuGet = async (req, res, next) => {
   try {
      const menus = await prisma.products.findMany()
      res.render('menu/menu', {
         menus,
         active: 'Menu'
      })
   } catch(e) {
      console.log(e)
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