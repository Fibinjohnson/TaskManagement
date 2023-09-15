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
exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.header("Authorization");
        if (!token) {
            return res.status(403).send("Access Denied");
        }
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        const secretKey = process.env.SECRETCODEJWT;
        if (!secretKey) {
            console.error('JWT secret key is not defined.');
            process.exit(1);
        }
        const verified = (0, jsonwebtoken_1.verify)(token, secretKey);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(500).json({ Tokenerror: err.message });
    }
});
exports.verifyToken = verifyToken;
