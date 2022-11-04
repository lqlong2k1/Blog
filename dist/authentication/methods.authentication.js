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
exports.decodeToken = exports.generateToken = exports.updateRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = __importDefault(require("util"));
var promisify = util_1.default.promisify;
const prisma_1 = __importDefault(require("../utils/prisma"));
const sign = promisify(jsonwebtoken_1.default.sign).bind(jsonwebtoken_1.default);
const verify = promisify(jsonwebtoken_1.default.verify).bind(jsonwebtoken_1.default);
function updateRefreshToken(username, refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma_1.default.users.update({
                where: {
                    username: username
                },
                data: {
                    refresh_token: refreshToken
                }
            });
            return true;
        }
        catch (error) {
            return false;
        }
    });
}
exports.updateRefreshToken = updateRefreshToken;
function generateToken(payload, secretSignature, tokenLife) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield sign({ payload }, secretSignature, {
                algorithm: 'HS256',
                expiresIn: tokenLife,
            });
        }
        catch (error) {
            console.log(`Error in generate access token:  + ${error}`);
            return null;
        }
    });
}
exports.generateToken = generateToken;
// export async function verifyToken(token: string, secretKey: string) {
//     try {
//         return await verify(token, secretKey);
//     } catch (error) {
//         console.log(`Error in verify access token:  + ${error}`);
//         return null;
//     }
// }
function decodeToken(token, secretKey) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield verify(token, secretKey, {
                ignoreExpiration: true,
            });
        }
        catch (error) {
            console.log(`Error in decode access token: ${error}`);
            return null;
        }
    });
}
exports.decodeToken = decodeToken;
