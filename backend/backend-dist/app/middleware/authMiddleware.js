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
exports.checkUser = exports.ensureAuth = exports.requireAuth = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.accessToken;
    const csrf = req.cookies._csrf;
    try {
        if (token && csrf) {
            jsonwebtoken_1.default.verify(token, 'accessToken', (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    res.redirect('/login');
                }
                else {
                    next();
                }
            }));
        }
        else {
            res.redirect('/login');
        }
    }
    catch (err) {
        console.log('this cookies are not valid');
    }
});
exports.requireAuth = requireAuth;
const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};
exports.ensureAuth = ensureAuth;
const checkUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.accessToken;
    try {
        if (token) {
            jsonwebtoken_1.default.verify(token, 'accessToken', (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    res.locals.authenticated = null;
                }
                else {
                    let user = yield prisma.users.findFirst({
                        where: {
                            id: decodedToken.id
                        }
                    });
                    res.locals.authenticated = user;
                    next();
                }
            }));
        }
        else {
            res.locals.authenticated = null;
            next();
        }
    }
    catch (err) {
        console.log('storing information failed');
        next();
    }
});
exports.checkUser = checkUser;
