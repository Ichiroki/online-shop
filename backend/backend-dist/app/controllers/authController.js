"use strict";
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
exports.logout_get = exports.login_post = exports.signup_post = exports.login_get = exports.signup_get = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const userRequest_1 = require("../../prisma/validation/userRequest");
const password_1 = require("../utils/password");
const csrf_1 = __importDefault(require("csrf"));
const tokens = new csrf_1.default();
const prisma = new client_1.PrismaClient();
// app/create json web token
const expiresIn = Date.now() + 8 * 3600000;
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, 'accessToken', {
        expiresIn: expiresIn
    });
};
const generateCSRFToken = () => {
    return crypto_1.default.randomBytes(32).toString('hex');
};
const csrfToken = generateCSRFToken();
// controller actions
const signup_get = (req, res) => {
    res.render('auth/signup', {
        active: 'Signup',
        token: csrfToken
    });
};
exports.signup_get = signup_get;
const login_get = (req, res) => {
    res.render('auth/login', {
        active: 'Login',
        token: csrfToken
    });
};
exports.login_get = login_get;
const signup_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // validate the data
        const dataUser = yield userRequest_1.RegisterUser.parseAsync(req.body);
        let hashedPassword = yield (0, password_1.hashPassword)(dataUser.password);
        let user = yield prisma.users.create({
            data: {
                // using random uuid as an id for Users
                id: crypto_1.default.randomUUID(),
                name: dataUser.name,
                email: dataUser.email,
                password: hashedPassword // password
            }
        });
        res.status(201).json({ user, success: true, error: null });
    }
    catch (e) {
        if (e instanceof zod_1.ZodError) {
            res.status(400).json({ success: false, error: e.flatten() });
        }
        else {
            throw e;
        }
    }
});
exports.signup_post = signup_post;
const login_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, csrfToken } = req.body;
    try {
        const csrf = csrfToken;
        const auth = yield userRequest_1.LoginUser.spa({ email, password });
        if (csrfToken !== csrf) {
            console.log('Invalid CSRF');
        }
        else {
            if (!auth.success) {
                res.status(401).json({ error: auth.error.flatten().fieldErrors });
            }
            else {
                const user = yield prisma.users.findFirst({
                    where: {
                        email: auth.data.email
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        password: true,
                    }
                });
                if (!user) {
                    res.status(401).json({
                        error: {
                            email: 'Email salah',
                        }
                    });
                }
                else {
                    const comPw = yield bcrypt_1.default.compare(auth.data.password, user.password);
                    if (!comPw) {
                        res.status(401).json({
                            error: {
                                password: 'Password salah'
                            }
                        });
                    }
                    else {
                        const token = createToken(user.id);
                        const secret = tokens.create(csrf);
                        res.cookie('accessToken', token, {
                            httpOnly: true,
                            expires: new Date(Date.now() + 8 * 3600000),
                            secure: true,
                        });
                        res.cookie('_csrf', secret, {
                            httpOnly: true,
                            expires: new Date(Date.now() + 8 * 3600000),
                            secure: true
                        });
                        res.status(200).json({ user, message: "Login sukses" });
                    }
                }
            }
        }
    }
    catch (e) {
        if (e instanceof zod_1.ZodError) {
            res.status(400).json({ message: "Login gagall", error: e.flatten() });
        }
    }
});
exports.login_post = login_post;
const logout_get = (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('_csrf');
    res.redirect('/');
};
exports.logout_get = logout_get;
exports.default = { signup_get: exports.signup_get, signup_post: exports.signup_post, login_get: exports.login_get, login_post: exports.login_post, logout_get: exports.logout_get };
