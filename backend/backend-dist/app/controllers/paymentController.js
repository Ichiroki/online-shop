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
exports.paymentMethodGopay = void 0;
const client_1 = require("@prisma/client");
const midtrans = require('midtrans-node');
const prisma = new client_1.PrismaClient();
const paymentMethodGopay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, amount, itemDetails, userId } = req.body;
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    try {
        // axios({
        //     url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
        //     method: "post",
        //     headers: {
        //         "Content-Type" : "application/json",
        //         "Accept" : "application/json",
        //         "Authorization": "Basic" + Buffer.from(serverKey).toString("base64")
        //     },
        //     data: {
        //         transactionDetails: {
        //             order_id: "order-is-" + getCurrentTimestamp(),
        //             gross_amount: 10000
        //         }
        //     }
        // })
        const transactionDetails = {
            orderId,
            grossAmount: amount
        };
        const transactionOptions = {
            gopay: {
                callback: ''
            }
        };
        const customerDetails = yield prisma.users.findUnique({
            where: {
                id: userId
            },
            select: {
                name: true,
                email: true
            }
        });
        const parameter = {
            transactionDetails,
            itemDetails,
            customerDetails,
            creditCard: {
                secure: true
            }
        };
        // const transaction = await snap.createTransaction(parameter, transactionOptions)
        // res.json({ token: transaction.redirect_url })
    }
    catch (e) {
        console.log("Payment failed " + e);
        res.statue(500).json({ error: "Internal server error bjirlach" });
    }
});
exports.paymentMethodGopay = paymentMethodGopay;
exports.default = { paymentMethodGopay: exports.paymentMethodGopay };
