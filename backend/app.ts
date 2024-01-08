import cookieParser from 'cookie-parser'
import express from 'express'
import session from 'express-session'
import authRoutes from './routes/authRoutes'
import passport from 'passport'
import ngrok from '@ngrok/ngrok'

const App = express()

// middleware
App.use(express.static('public'))
App.use(express.json())
App.use(cookieParser())

App.use(session({
   secret: 'accessToken',
   resave: false,
   saveUninitialized: true,
 }))

App.use(session({
   secret: '_csrf',
   resave: false,
   saveUninitialized: true,
}))

App.use(passport.initialize())
App.use(passport.session())

// view engine
App.set('view engine', 'ejs')

// routes
App.use(authRoutes)

const server = App.listen(3000, async () => {
   console.log(`Server is running on http://127.0.0.1:3000`);
 
   // Jalankan Ngrok setelah server dimulai
   try {
     const url = await ngrok.connect({
       addr: 3000,
       authtoken: '2ZhAy778yySIbctG354XiNBiuoW_Uzy4zaAoov9howbH6dL4', // Ganti dengan authtoken Ngrok Anda
     });
 
     console.log(`Ngrok tunnel is active at: ${url}`);
   } catch (error) {
     console.error('Error starting Ngrok:', error);
   }
 });