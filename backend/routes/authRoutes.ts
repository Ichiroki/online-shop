import cors from 'cors';
import { Router } from 'express';
import { addToCart, deleteFromCart } from '../app/controllers/addToCartController';
import authController from '../app/controllers/authController';
import menuController from '../app/controllers/menuController';
import { authMiddleware, checkUser } from '../app/middleware/authMiddleware';

const router: Router = Router();

router.use(cors({
   origin: "http://localhost:5173",
   credentials: true,
   preflightContinue: true
}))

// Credentials
router.get('*', checkUser)
router.get('/', (req, res) => res.render('home', { active: 'Home' }))

// Authentication
router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)
router.get('/login', authController.login_get)
router.post('/login', authController.login_post)
router.options('/login')
router.get('/logout', authController.logout_get)

// Menu
router.get('/menu', authMiddleware, menuController.menuGet)

// For API
router.get('/api/menu', menuController.menuGetAPI)
router.post('/add-to-cart', checkUser, async(req, res) => {
   try {
      const { userId, productId, quantity } = req.body
      const addMenuToCart = await addToCart(userId, productId, quantity)
      return addMenuToCart
   } catch(e) {
      console.log(e)
   }
})
router.post('/delete-to-cart', checkUser, async(req, res) => {
   try {
      const { userId, productId, quantity } = req.body
      const deleteMenuFromCart = await deleteFromCart(userId, productId, quantity)
      return deleteMenuFromCart
   } catch(e) {
      console.log(e)
   }
})

export default router;