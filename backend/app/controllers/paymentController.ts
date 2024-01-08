import midtransClient from 'midtrans-client'
const { v4: uuidv4 } = require('uuid')

let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
 })

export const pay = () => {
    let parameter = {
            payment_type: 'qris',
            transaction_details: {
                order_id: uuidv4(),
                gross_amount: 0
            },
            item_details: [
                {
                    id: uuidv4(),
                    name: 'Tyrannosaurus Rex 3D Models',
                    quantity: 1,
                    price: 75000
                },
                {
                    id: uuidv4(),
                    name: 'Hippo 3D Models',
                    quantity: 1,
                    price: 50000
                },
            ],
            customer_details: {
                first_name: 'Fahrezi',
                last_name: ' Rizqiawan',
                email: 'fahrezirizqiawan12649@gmail.com',
                phone: '087820154350',
                billing_address:  {
                    address: 'jl.sibuta gua hantu no.120',
                city: 'Depok',
                postal_code: '16436'
            },
            qris: {
                "acquirer": "gopay"
            }
        }
   }

   const totalAmount = parameter.item_details.reduce(
    (total, item) => total + item.price, 0
   )

   parameter.transaction_details.gross_amount = totalAmount

    snap.createTransaction(parameter)
    .then(console.log)
    .catch(e => console.log(e))
}

export default { pay }