import { Router } from 'express';
import authController from '../app/controllers/authController';
import menuController from '../app/controllers/menuController';
import { authMiddleware, checkUser } from '../app/middleware/authMiddleware';
import cors from 'cors'

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

// ['POST','PUT','PATCH','GET','DELETE','OPTIONS']

export default router;