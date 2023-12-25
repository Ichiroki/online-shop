import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const menuGet = async (req, res, next) => {
   const token = req.cookies.accessToken

   try {
      const menus = await prisma.products.findMany(
         {
            include: {
               productrating: true
            }
         }
      )
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

      const existingRating = await prisma.productrating.findFirst({
         where: {
            userId,
            productId,
         }
      })

      if(existingRating) {
         throw new Error('You already give rating to this menu')
      }

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
   const {param1} =  req.params
   const {order} = req.query

   try {
      if(param1) {
         const menus = await prisma.products.findFirst({
            where: {
               slug: param1,
            },
            include: {
               productrating : {
                  select: {
                     rating: true,
                     feedback: true,
                     created_at: true,
                     productId: true,
                     users: {
                        select: {
                           name: true,
                        }
                     }
                  }
               },  
            }
         }) 
         res.status(201).json(menus)
      } else {
         const menus = await prisma.products.findMany({
            include: {
               productrating: true
            },
            orderBy: {
               name: order === 'desc' ? 'desc' : 'asc'
            }
         })
         res.status(201).json(menus)
      }
   } catch(e) {
      console.log(e)
   }
}

export const ratingGetAPI = async(req, res) => {
   const {param1} = req.params

   try {
      if(param1) {
         const rating = await prisma.productrating.findMany({
            where: {
               OR: [{
                  products: {
                     slug: param1
                  }
               },
               {
                  users: {
                     id: param1
                  }
               }]
            },
            select: {
               rating: true,
               feedback: true,
               products: {
                  select: {
                     name: true,
                     slug: true
                  }
               },
               users: {
                  select: {
                     name: true,
                     email: true,
                  }
               },
               created_at: true,
            }
         })

         res.status(201).json(rating)
      } else {
         const rating = await prisma.productrating.findMany({
            select: {
               id: true,
               productId: true,
               rating: true,
               users: {
                  select: {
                     name: true,
                     email: true,
                     _count: true
                  }
               }
            }
         })
         res.status(201).json(rating)
      }
   } catch(e) {
      console.log(e)
   }
}

export default { menuGet, menuGetAPI, addRating, ratingGetAPI }