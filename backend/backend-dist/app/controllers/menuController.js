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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingGetAPI = exports.menuGetAPI = exports.addRating = exports.menuGet = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const menuGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.accessToken;
    try {
        const menus = yield prisma.products.findMany({
            include: {
                productrating: true
            }
        });
        res.render('menu/menu', {
            menus,
            active: 'Menu',
            token
        });
    }
    catch (e) {
        console.log(e);
        next();
    }
});
exports.menuGet = menuGet;
const addRating = (userId, productId, rating, feedback) => __awaiter(void 0, void 0, void 0, function* () {
    var today = new Date().toISOString();
    try {
        const product = yield prisma.products.findUnique({
            where: {
                id: productId
            }
        });
        const user = yield prisma.users.findUnique({
            where: {
                id: userId
            }
        });
        const existingRating = yield prisma.productrating.findFirst({
            where: {
                userId,
                productId,
            }
        });
        if (existingRating) {
            throw new Error('You already give rating to this menu');
        }
        if (!product || !user) {
            throw new Error('Product or user tidak ditemukan');
        }
        yield prisma.productrating.create({
            data: {
                productId,
                userId,
                rating,
                feedback,
                created_at: today
            }
        });
    }
    catch (e) {
        console.log("Internal server error, please wait " + e);
        throw e;
    }
});
exports.addRating = addRating;
// For API Only
const menuGetAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { param1 } = req.params;
    try {
        if (param1) {
            const menus = yield prisma.products.findFirst({
                where: {
                    slug: param1,
                },
                include: {
                    productrating: {
                        select: {
                            rating: true,
                            feedback: true,
                            created_at: true,
                            productId: true,
                            users: {
                                select: {
                                    name: true,
                                }
                            }
                        }
                    },
                }
            });
            res.status(201).json(menus);
        }
        else {
            const menus = yield prisma.products.findMany({
                include: {
                    productrating: true
                }
            });
            res.status(201).json(menus);
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.menuGetAPI = menuGetAPI;
const ratingGetAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { param1 } = req.params;
    try {
        if (param1) {
            const rating = yield prisma.productrating.findMany({
                where: {
                    products: {
                        slug: param1
                    }
                },
                select: {
                    rating: true,
                    feedback: true,
                    productId: true,
                    users: {
                        select: {
                            name: true,
                            email: true,
                        }
                    },
                    created_at: true,
                }
            });
            res.status(201).json(rating);
        }
        else {
            const rating = yield prisma.productrating.findMany({
                select: {
                    id: true,
                    productId: true,
                    rating: true,
                    users: {
                        select: {
                            name: true,
                            email: true,
                            _count: true
                        }
                    }
                }
            });
            res.status(201).json(rating);
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.ratingGetAPI = ratingGetAPI;
exports.default = { menuGet: exports.menuGet, menuGetAPI: exports.menuGetAPI, addRating: exports.addRating, ratingGetAPI: exports.ratingGetAPI };
