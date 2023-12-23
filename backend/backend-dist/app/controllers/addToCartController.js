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
exports.deleteFromCart = exports.addToCart = exports.cartGet = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cartGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = res.locals.authenticated;
    try {
        if (userData && userData.id) {
            const carts = yield prisma.cart.findMany({
                where: {
                    userId: userData.id
                },
                select: {
                    products: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            price: true
                        }
                    },
                    users: {
                        select: {
                            id: true,
                        }
                    },
                    quantity: true
                },
            });
            return res.status(201).json(carts);
        }
        else {
            return res.status(404).json({ message: "There is not authenticated user" });
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.cartGet = cartGet;
const addToCart = (userId, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingCartItem = yield prisma.cart.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId
                }
            }
        });
        if (existingCartItem) {
            yield prisma.cart.update({
                where: {
                    id: existingCartItem.id,
                },
                data: {
                    quantity: existingCartItem.quantity + 1,
                }
            });
        }
        else {
            yield prisma.cart.create({
                data: {
                    userId,
                    productId,
                    quantity
                }
            });
        }
    }
    catch (e) {
        console.log('Internal Server Error, Please wait a moment', e);
    }
});
exports.addToCart = addToCart;
const deleteFromCart = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingCartItem = yield prisma.cart.findFirst({
            where: {
                userId,
                productId
            }
        });
        if (existingCartItem) {
            if (existingCartItem.quantity > 1) {
                yield prisma.cart.updateMany({
                    where: {
                        userId,
                        productId
                    },
                    data: {
                        quantity: existingCartItem.quantity - 1
                    }
                });
            }
            else {
                yield prisma.cart.deleteMany({
                    where: {
                        userId,
                        productId
                    }
                });
            }
        }
    }
    catch (e) {
        console.log('Internal server error, please wait', e);
    }
});
exports.deleteFromCart = deleteFromCart;
exports.default = { cartGet: exports.cartGet };
