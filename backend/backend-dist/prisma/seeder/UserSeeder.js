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
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt();
        const hashed = yield bcrypt_1.default.hash('password', salt);
        yield prisma.users.createMany({
            data: [
                {
                    id: 'f778afe5-61d6-45c2-b021-f209fd216f00',
                    name: 'Ichiroki',
                    email: 'ichiroki@gmail.com',
                    password: hashed
                },
                {
                    id: '7eb478b4-6d41-4ca8-b35d-9bb0c4f8cb22',
                    name: 'Mirai',
                    email: 'mirai@gmail.com',
                    password: hashed
                },
            ],
        });
        yield prisma.products.createMany({
            data: [
                {
                    id: 'acc90fb0-f782-488f-903e-098694aa1547',
                    name: 'Ice Cappucino Coffee',
                    slug: 'ice-cappucino-coffee',
                    desc: 'Cappucino coffee that can bring back your mood',
                    price: 8000,
                    image: 'iceCappucinoCoffee.png',
                    best_seller: false,
                    best_product: true,
                    category: 'drink',
                    available: true,
                },
                {
                    id: '3dd06ca6-b8d3-4833-9800-a884453a41c5',
                    name: 'Mocha Latte',
                    slug: 'mocha-latte',
                    desc: 'Mocha Latte that can bring back your mood',
                    price: 8000,
                    image: 'mochaLatte.jpg',
                    best_seller: false,
                    best_product: false,
                    category: 'drink',
                    available: true,
                },
                {
                    id: '302dd14f-5893-469b-8127-890c7035642f',
                    name: 'Black Coffee',
                    slug: 'black-coffee',
                    desc: 'Black Coffee that can bring back your mood',
                    price: 7000,
                    image: 'blackCoffee.png',
                    best_seller: true,
                    best_product: false,
                    category: 'drink',
                    available: true,
                },
                {
                    id: 'a6d251f7-a892-489c-b679-bc7928643d79',
                    name: 'Ice Tea',
                    slug: 'ice-tea',
                    desc: 'Ice Tea that can bring back your mood',
                    price: 5000,
                    image: 'iceTea.jpg',
                    best_seller: true,
                    best_product: true,
                    category: 'drink',
                    available: true,
                },
                {
                    id: 'd54c606e-2246-4916-87a6-587fc9ac937b',
                    name: 'Matcha Tea',
                    slug: 'matcha-tea',
                    desc: 'Matcha Tea that can bring back your mood',
                    price: 6000,
                    image: 'matchaTea.png',
                    best_seller: false,
                    best_product: false,
                    category: 'drink',
                    available: true,
                },
                {
                    id: '06c5cc3d-e182-4f0c-bf4c-7eaad184bbb4',
                    name: 'Donut',
                    slug: 'donut',
                    desc: 'A circle donut with caramel',
                    price: 5000,
                    image: 'donut.jpg',
                    best_seller: true,
                    best_product: false,
                    category: 'food',
                    available: true,
                },
                {
                    id: '02a67dbb-e77c-4b2b-bc77-6e0251b10a7f',
                    name: 'Brownies',
                    slug: 'brownies',
                    desc: 'Black choco brownies can melt in your mouth',
                    price: 10000,
                    image: 'brownies.jpg',
                    best_seller: false,
                    best_product: false,
                    category: 'food',
                    available: true,
                },
            ]
        });
    });
}
run().catch((error) => console.log(error)).finally(() => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.$disconnect(); }));
