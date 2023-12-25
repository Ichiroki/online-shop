import axios from 'axios'
import midtransClient from 'midtrans-client'

let serverKey = "Mid-server-n16mveRIye2Tw955Qd4-z28v"

let encodedKey = Buffer.from(serverKey + ':').toString('base64')

new midtransClient.CoreApi({
    isProduction: false,
    serverKey,
    clientKey: "Mid-client--5_kwW7KRbjvs5BF"
 })

const dataVABCA = {
    payment_type: 'bank_transfer',
    transaction_details: {
      order_id: 'order-101',
      gross_amount: 44000,
      merchant_id: "G013964521"
    },
    va_numbers: [
        {
            "bank": "bca",
            "va_number": "812785002530231"
        }
    ],
  };

export const paymentMethodVABCA = async (req, res) => {
    try {
        const response = await axios.post('https://api.sandbox.midtrans.com/v2/charge', dataVABCA, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${encodedKey}`,
                'Content-Type': 'application/json',
              },
        })
        console.log('midtrans response : ', response.data)
        res.json(response.data)
    }
    catch(e) {
        console.error('internal server error, please wait ', e)
    }
}

export default { paymentMethodVABCA }