import cookieParser from 'cookie-parser'
import express from 'express'
import session from 'express-session'
import authRoutes from './routes/authRoutes'
import passport from 'passport'
import { Server } from 'socket.io'
import * as http from 'http'

const App = express()
const server =http.createServer(App)
const io = new Server(server)
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

App.set('view engine', 'ejs')

App.use(authRoutes)

io.on('connection', (socket) => {
   console.log('A user connected')

      socket.on('chat message', (msg) => {
         console.log(`Message from client : ${msg}`)

         io.emit('chat message', msg)
      })

      socket.on('disconnect', () => {
         console.log('A user disconnected')
      })
})

server.listen(3000, () => {
   console.log(`Server is running on http://127.0.0.1:3000`);
});

// (async () => {
//    const url = await ngrok.connect({
//      addr: 3000,
//      authtoken_from_env: true,
//    });
 
//    console.log(`Ngrok tunnel is active at: ${url}`);
//  })();

