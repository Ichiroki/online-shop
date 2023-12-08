import axios from "axios"
import cryptoRandomString from "crypto-random-string"
import { useState } from "react"

export const usePayment = () => {
  const [orderId, setOrderId] = useState(
    cryptoRandomString({ length: 32, type: "url-safe" }),
  )
  const [id, setId] = useState(
    cryptoRandomString({ length: 32, type: "url-safe" }),
  )
  const [amount, setAmount] = useState(10000)
  const [token, setToken] = useState("")

  const handlePaymentGopay = async () => {
    const response = await axios.post("/payment/gopay", {
      orderId,
      amount,
      itemDetails: [
        {
          id,
          price: amount,
          quantity: 1,
          name: "Item 1",
        },
      ],
    })

    setToken(response.data.token)

    window.location.href = response.data.token
  }

  return { handlePaymentGopay }
}
