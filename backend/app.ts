import cookieParser from 'cookie-parser'
import express from 'express'
import session from 'express-session'
import authRoutes from './routes/authRoutes'

const App = express()

// middleware

App.use(express.static('public'))
App.use(express.json())
App.use(cookieParser())

App.use(session({
   secret: 'accessToken',
   resave: false,
   saveUninitialized: true,
   cookie: { secure: true }
 }))

// view engine
App.set('view engine', 'ejs')

// routes
App.use(authRoutes)

App.listen(3000, () => {
   console.log(`Server is running on ${3000} : http://localhost:3000`)
})