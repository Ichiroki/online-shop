"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const passport_1 = __importDefault(require("passport"));
const cookie = require('cookie-parser');
const App = (0, express_1.default)();
// middleware
App.use(express_1.default.static('public'));
App.use(express_1.default.json());
App.use((0, cookie_parser_1.default)());
App.use((0, express_session_1.default)({
    secret: 'accessToken',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
App.use(passport_1.default.initialize());
App.use(passport_1.default.session());
// view engine
App.set('view engine', 'ejs');
// routes
App.use(authRoutes_1.default);
App.listen(3000, () => {
    console.log(`Server is running on 3000 : http://127.0.0.1:3000`);
});
