"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = exports.RegisterUser = void 0;
const zod_1 = require("zod");
exports.RegisterUser = zod_1.z.object({
    name: zod_1.z.string().nonempty({ message: "Silakan masukkan nama" }),
    email: zod_1.z.string({
        required_error: "Email diperlukan"
    }).email({ message: " Email harus berupa email yang valid" }),
    password: zod_1.z.string().min(8, { message: "Minimal password memiliki 8 karakter" }),
    confPassword: zod_1.z.string().min(8, { message: "Minimal password memiliki 8 karakter" })
}).refine((data) => data.password === data.confPassword, {
    message: " Password tidak cocok",
    path: ["confPassword"]
});
exports.LoginUser = zod_1.z.object({
    email: zod_1.z.string().nonempty({ message: "Email diperlukan" }),
    password: zod_1.z.string().min(8, { message: "Minimal password memiliki 8 karakter" })
});
