import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const addToCart = async (userId: string, productId: string, quantity: number) => {
    try {
        const existingCartItem = await prisma.cart.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId
                }
            }
        })

        if(existingCartItem) {
            await prisma.cart.update({
                where: {
                    id: existingCartItem.id,
                },
                data: {
                    quantity: existingCartItem.quantity + 1,
                }
            })
        } else {
            await prisma.cart.create({
                data: {
                    userId,
                    productId,
                    quantity
                }
            })
        }
    } catch(e) {
        console.log('Internal Server Error, Please wait a moment', e);
    }
}

export const deleteFromCart = async (userId: string, productId: string, quantity: number) => {
    try {
        const existingCartItem = await prisma.cart.findFirst({
            where: {
                userId,
                productId
            }
        })

        if(existingCartItem) {
            if(existingCartItem.quantity > 1) {
                await prisma.cart.updateMany({
                    where: {
                        userId,
                        productId
                    },
                    data: {
                        quantity: existingCartItem.quantity - 1
                    }
                })
            } else {
                await prisma.cart.deleteMany({
                    where: {
                        userId,
                        productId
                    }
                })
            }
        }
    } catch(e) {
        console.log('Internal server error, please wait', e)
    }
}