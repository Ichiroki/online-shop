import axios from "axios"
import Cookies from 'js-cookie'

let randNumber = () => {
  const arr: Number[] = []

  for (let i = 0; i < 5; i++) {
    const number: Number = Math.floor(Math.random() * 9) + 1
    arr.push(number)
  }
  return arr.join('')
}

export const usePayment = () => {
  const payment = async (users, total, ...args) => {
    const user = JSON.parse(users)
    const csrfCookie = Cookies.get('_csrf')

    const product = args.map((items) => 
      items.map((item) => ({
        id: item.products.id,
        name: item.products.name,
        quantity: item.quantity,
        price: parseInt(item.products.price),
      }))
    )

    try {
      axios.post('/pay', 
        {
          "transaction_details": {
            "order_id": `ORDER-${randNumber()}`,
            "gross_amount": total
          },
          "item_details": product,
          "user_id": user.id,
          "csrf": csrfCookie
        } , {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Basic ${csrfCookie}`, 
          }
        }
      )
      .then((response) => {
        window.location.href = response.data.redirect_url
      })
    } catch(e) {
      console.log(e)
    }
  }

  return { payment }
}