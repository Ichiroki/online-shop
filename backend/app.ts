import cookieParser from 'cookie-parser'
import express from 'express'
import session from 'express-session'
import authRoutes from './routes/authRoutes'
import passport from 'passport'

const App = express()
const ngrok = require('@ngrok/ngrok')

// middleware
App.use(express.static('public'))
App.use(express.json())
App.use(cookieParser())

App.use(session({
   secret: 'accessToken',
   resave: false,
   saveUninitialized: true,
   cookie: { secure: true, sameSite: 'none', domain: 'https://ichiroki.my.id' }
}))

App.use(session({
   secret: '_csrf',
   resave: false,
   saveUninitialized: true,
   cookie: { secure: true, sameSite: 'none', domain: 'https://ichiroki.my.id' }
}))


App.use(passport.initialize())
App.use(passport.session())

// view engine
App.set('view engine', 'ejs')

// routes
App.use(authRoutes)

App.listen(3000, () => {
   console.log(`Server is running on http://127.0.0.1:3000`);
});

// (async () => {
//    const url = await ngrok.connect({
//      addr: 3000,
//      authtoken_from_env: true,
//    });
 
//    console.log(`Ngrok tunnel is active at: ${url}`);
//  })();

