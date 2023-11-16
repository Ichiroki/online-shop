import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import crypto from 'crypto'

const prisma = new PrismaClient()

async function run() {
   const salt = await bcrypt.genSalt()
   const hashed = await bcrypt.hash('password', salt)

   await prisma.users.createMany({
      data: [
         {
            id: 'f778afe5-61d6-45c2-b021-f209fd216f00',
            name: 'Ichiroki',
            email: 'ichiroki@gmail.com',
            password: hashed
         },
         {
            id: '7eb478b4-6d41-4ca8-b35d-9bb0c4f8cb22',
            name: 'Mirai',
            email: 'mirai@gmail.com',
            password: hashed
         },
      ],
   })

   await prisma.products.createMany({
      data: [
         {
            id: 'acc90fb0-f782-488f-903e-098694aa1547',
            name: 'Ice Cappucino Coffee',
            desc: 'Cappucino coffee that can bring back your mood',
            price: 15000,
            image: 'iceCappucinoCoffee.png',
            available: true,
         },
         {
            id: '3dd06ca6-b8d3-4833-9800-a884453a41c5',
            name: 'Mocha Latte',
            desc: 'Mocha Latte that can bring back your mood',
            price: 25000,
            image: 'mochaLatte.jpg',
            available: true,
         },
         {
            id: 'd54c606e-2246-4916-87a6-587fc9ac937b',
            name: 'Black Coffe',
            desc: 'Black Coffee that can bring back your mood',
            price: 10000,
            image: 'blackCoffee.png',
            available: true,
         },
      ]
   })
}

run().catch((error) => console.log(error)).finally(async () => await prisma.$disconnect())