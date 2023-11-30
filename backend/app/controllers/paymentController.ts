import { PrismaClient } from "@prisma/client"
const midtrans = require('midtrans-node')
import axios from 'axios'

const prisma = new PrismaClient()

export const paymentMethodGopay = async (req, res) => {
    const { orderId, amount, itemDetails, userId } = req.body
    const serverKey = process.env.MIDTRANS_SERVER_KEY

    try {
        // axios({
        //     url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
        //     method: "post",
        //     headers: {
        //         "Content-Type" : "application/json",
        //         "Accept" : "application/json",
        //         "Authorization": "Basic" + Buffer.from(serverKey).toString("base64")
        //     },
        //     data: {
        //         transactionDetails: {
        //             order_id: "order-is-" + getCurrentTimestamp(),
        //             gross_amount: 10000
        //         }
        //     }
        // })
        const transactionDetails = {
            orderId,
            grossAmount: amount
        }

        const transactionOptions = {
            gopay: {
                callback: ''
            }
        }

        const customerDetails = await prisma.users.findUnique({
            where: {
                id: userId
            },
            select: {
                name: true,
                email: true
            }
        })

        const parameter = {
            transactionDetails,
            itemDetails,
            customerDetails,
            creditCard: {
                secure: true
            }
        }

        // const transaction = await snap.createTransaction(parameter, transactionOptions)

        // res.json({ token: transaction.redirect_url })
    } catch(e) {
        console.log("Payment failed " + e)
        res.statue(500).json({ error: "Internal server error bjirlach" })
    }
}

export default { paymentMethodGopay }