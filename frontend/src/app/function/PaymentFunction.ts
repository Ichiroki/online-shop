import axios from "axios"

export const usePayment = () => {
  const paymentVABCA = async () => {
    try {
      const response = await axios.post('/payment/bca/va')
      const data = response.data
      console.log('Payment result : ', data)
    } catch(e) {
      console.error('error', e)
    }
  }
  

  return { paymentVABCA }
}