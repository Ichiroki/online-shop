import cors from 'cors';
import csurf from 'csurf';
import { Router } from 'express';
import addToCartController, { addToCart, deleteFromCart } from '../app/controllers/addToCartController';
import authController from '../app/controllers/authController';
import menuController, { addRating } from '../app/controllers/menuController';
import { checkUser, requireAuth } from '../app/middleware/authMiddleware';
import paymentController from '../app/controllers/paymentController';
import passport from 'passport';
import axios from 'axios';

const router: Router = Router();
const csrfProtection = csurf({cookie: true})
const GoogleStrategy = require('passport-google-oauth20').Strategy



router.use(cors({
   origin: "http://localhost:5173",
   credentials: true,
   preflightContinue: true
}))

passport.use(new GoogleStrategy({
   clientID: "906970024535-1sgj1j4l471fl0vd6hrl0prjrov720lo.apps.googleusercontent.com",
   clientSecret: "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",
   callbackURL: "http://127.0.0.1:3000/auth/google/callback",
 }, async (accessToken, refreshToken, profile, done) => {
   return done(null, profile)
 }))


// Credentials
router.get('*', checkUser, csrfProtection)
router.get('/', (req, res) => res.render('home', { active: 'Home' }))

// Authentication
router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)
router.get('/login', authController.login_get)
router.post('/login', authController.login_post)
router.get('/logout', authController.logout_get)

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/auth/google/callback', passport.authenticate('google', {
   failureRedirect: '/login', 
   failureMessage: true, 
   successRedirect: '/',
   session: true,
   scope: ['profile', 'email']
}), (req, res) => {
   res.redirect('/')
})

passport.serializeUser(function(user, cb) {
   cb(null, user)
})

passport.deserializeUser(function(obj : null, cb) {
   cb(null, obj)
})

// Menu
router.get('/menu', menuController.menuGet)
router.post('/add-rating', async(req, res) => {
   try {
      const { userId, productId, rating, feedback } = req.body
      const addRatingToMenu = await addRating(userId, productId, rating, feedback)
      return addRatingToMenu
   } catch(e) {
      console.log(e)
   }
})

router.post('/add-to-cart', requireAuth, async(req, res) => {
   try {
      const { userId, productId, quantity } = req.body
      const addMenuToCart = await addToCart(userId, productId, quantity)
      return addMenuToCart
   } catch(e) {
      console.log(e)
   }
})

router.post('/delete-from-cart', requireAuth, async(req, res) => {
   try {
      const { userId, productId } = req.body
      const deleteMenuFromCart = await deleteFromCart(userId, productId)
      return deleteMenuFromCart
   } catch(e) {
      console.log(e)
   }
})

// Order

router.post('/payment/bca/va', paymentController.paymentMethodVABCA)

// For API
router.get('/api/menu', menuController.menuGetAPI)
router.get('/api/menu/:param1', menuController.menuGetAPI)
router.get('/api/cart', addToCartController.cartGet)
router.get('/api/rating', menuController.ratingGetAPI)
router.get('/api/rating/:param1', menuController.ratingGetAPI)


export default router;