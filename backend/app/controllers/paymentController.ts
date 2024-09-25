import midtransClient from 'midtrans-client'
const { v4: uuidv4 } = require('uuid')
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
 })

let serverKey = process.env.MIDTRANS_SERVER_KEY

export const createTransaction = async (req, res, next) => {

    const transaction = req.body.transaction_details

    const item = req.body.item_details[0]
    const user = req.body.user_id

    const getUser = await prisma.users.findUnique({
        where: {
            id: user
        }
    })

    const items = item.map((i) => ({
        id: i.id,
        name: i.name,
        quantity: i.quantity,
        price: i.price
    }))

    console.log(items)

    const parameter = {
        transaction_details: {
            "order_id": transaction.order_id,
            "gross_amount": transaction.gross_amount
        },
        item_details: [items],
        customer_details: {
            first_name: getUser?.name,
            last_name: ' Rizqiawan',
            email: 'fahrezirizqiawan12649@gmail.com',
            phone: '087820154350',
        }
   }

    // snap.createTransaction(parameter)
    const midtransApi = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions',
        {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : `Basic ${Buffer.from(`${serverKey}`).toString('base64')}`
            },
            body: JSON.stringify(parameter)
        }
    )
    const response = await midtransApi.json()

    res.status(201).json(response)
}

export const getTransaction = () => {
    console.log('get transaction')
}

export const getTransactionById = () => {
    console.log('get transaction by id')
}

export const updateTransactionStatus = () => {
    console.log('update transaction status')
}

export default { createTransaction, getTransaction }