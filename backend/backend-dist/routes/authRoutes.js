"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const addToCartController_1 = __importStar(require("../app/controllers/addToCartController"));
const authController_1 = __importDefault(require("../app/controllers/authController"));
const menuController_1 = __importStar(require("../app/controllers/menuController"));
const authMiddleware_1 = require("../app/middleware/authMiddleware");
const paymentController_1 = __importDefault(require("../app/controllers/paymentController"));
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
router.use((0, cors_1.default)({
    origin: "https://ichiroki.my.id",
    credentials: true,
    preflightContinue: true
}));
passport_1.default.use(new GoogleStrategy({
    clientID: "906970024535-1sgj1j4l471fl0vd6hrl0prjrov720lo.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://127.0.0.1:3000/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    return done(null, profile);
})));
// Credentials
router.get('*', authMiddleware_1.checkUser);
router.get('/', (req, res) => res.render('home', { active: 'Home' }));
// Authentication
router.get('/signup', authController_1.default.signup_get);
router.post('/signup', authController_1.default.signup_post);
router.get('/login', authController_1.default.login_get);
router.post('/login', authController_1.default.login_post);
router.get('/logout', authController_1.default.logout_get);
router.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport_1.default.authenticate('google', {
    failureRedirect: '/login',
    failureMessage: true,
    successRedirect: '/',
    session: true,
    scope: ['profile', 'email']
}), (req, res) => {
    res.redirect('/');
});
passport_1.default.serializeUser(function (user, cb) {
    cb(null, user);
});
passport_1.default.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
// Menu
router.get('/menu', menuController_1.default.menuGet);
router.post('/add-rating', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId, rating, feedback } = req.body;
        const addRatingToMenu = yield (0, menuController_1.addRating)(userId, productId, rating, feedback);
        return addRatingToMenu;
    }
    catch (e) {
        console.log(e);
    }
}));
router.post('/add-to-cart', authMiddleware_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId, quantity } = req.body;
        const addMenuToCart = yield (0, addToCartController_1.addToCart)(userId, productId, quantity);
        return addMenuToCart;
    }
    catch (e) {
        console.log(e);
    }
}));
router.post('/delete-from-cart', authMiddleware_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId } = req.body;
        const deleteMenuFromCart = yield (0, addToCartController_1.deleteFromCart)(userId, productId);
        return deleteMenuFromCart;
    }
    catch (e) {
        console.log(e);
    }
}));
router.post('/payment/gopay', authMiddleware_1.requireAuth, paymentController_1.default.paymentMethodGopay);
// For API
router.get('/api/menu', menuController_1.default.menuGetAPI);
router.get('/api/menu/:param1', menuController_1.default.menuGetAPI);
router.get('/api/cart', addToCartController_1.default.cartGet);
router.get('/api/rating', menuController_1.default.ratingGetAPI);
router.get('/api/rating/:param1', menuController_1.default.ratingGetAPI);
exports.default = router;
