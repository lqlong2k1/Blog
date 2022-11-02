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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.login = exports.removeUserById = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const userConst = __importStar(require("../const/user.const"));
const errMessage = __importStar(require("../const/err-messages.const"));
const successMessage = __importStar(require("../const/success-messages.const"));
const methodAuthentication = __importStar(require("../authentication/methods.authentication"));
const rand_token_1 = __importDefault(require("rand-token"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../utils/prisma"));
dotenv_1.default.config();
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield prisma_1.default.users.findMany();
        return users;
    });
}
exports.getAllUsers = getAllUsers;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.users.findFirst({
            where: {
                id: id
            }
        });
        if (!user) {
            return errMessage.NOT_FOUND_USER;
        }
        return user;
    });
}
exports.getUserById = getUserById;
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        // generate salt to hash password
        const salt = yield bcrypt_1.default.genSalt(userConst.SALT_VALUE);
        // now we set user password to hashed password
        password = yield bcrypt_1.default.hash(password, salt);
        return password;
    });
}
function createUser(_a) {
    var { username, password, dob } = _a, rest = __rest(_a, ["username", "password", "dob"]);
    return __awaiter(this, void 0, void 0, function* () {
        const passwordHashed = yield hashPassword(password);
        const user = yield prisma_1.default.users.create({
            data: Object.assign(Object.assign({}, rest), { username: username.toLowerCase(), password: passwordHashed, dob: new Date(dob) })
        });
        return user;
    });
}
exports.createUser = createUser;
function updateUser(id, _a) {
    var { dob } = _a, rest = __rest(_a, ["dob"]);
    return __awaiter(this, void 0, void 0, function* () {
        const isUser = yield prisma_1.default.users.findFirst({
            where: {
                id: id
            }
        });
        if (!isUser) {
            return errMessage.NOT_FOUND_USER;
        }
        const isUpdated = yield prisma_1.default.users.update({
            where: {
                id: id
            },
            data: Object.assign(Object.assign({}, rest), { dob: new Date(dob) })
        });
        if (!isUpdated) {
            errMessage.UPDATE_USER_FAIL;
        }
        return isUpdated;
    });
}
exports.updateUser = updateUser;
function removeUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.users.findFirst({
            where: {
                id: id
            }
        });
        if (!user) {
            return errMessage.NOT_FOUND_USER;
        }
        const isRemoved = yield prisma_1.default.users.delete({
            where: {
                id: id
            }
        });
        if (!isRemoved)
            return errMessage.REMOVED_USER_FAIL;
        return successMessage.REMOVED_USER_SUCCESS;
    });
}
exports.removeUserById = removeUserById;
function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.users.findFirst({ where: { username: username.toLowerCase() } });
        if (!user) {
            return {
                'message': errMessage.LOGIN_FAIL_USERNAME
            };
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return {
                'message': errMessage.LOGIN_FAIL_PASSWORD
            };
        }
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        const dataForAccessToken = {
            username: username,
            password: password
        };
        const accessToken = yield methodAuthentication.generateToken(dataForAccessToken, accessTokenSecret, accessTokenLife);
        console.log('ACCESS TOKEN: ' + accessToken);
        if (!accessToken) {
            return {
                'message': errMessage.LOGIN_FAIL_ACCESS_TOKEN
            };
        }
        // create a refresh token ngẫu nhiên
        let refresh_token = rand_token_1.default.generate(Number(process.env.REFRESH_TOKEN_SIZE));
        if (!user.refresh_token) {
            //If user haven't refresh token yet -> save this refresh token into database
            yield methodAuthentication.updateRefreshToken(user.username, refresh_token);
        }
        else {
            refresh_token = user.refresh_token;
        }
        if (user.role_id === 1) {
            return {
                'message': successMessage.LOGIN_SUCCESS_ADMIN,
                'access-token': accessToken,
                'refresh-token': refresh_token
            };
        }
        else {
            return {
                'message': successMessage.LOGIN_SUCCESS_USER,
                'access-token': accessToken,
                'refresh-token': refresh_token
            };
        }
    });
}
exports.login = login;
function refreshToken(accessToken, refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!accessToken)
            return {
                'message': errMessage.NOT_FOUND_ACCESS_TOKEN
            };
        if (!refreshToken)
            return {
                'message': errMessage.NOT_FOUND_REFRESH_TOKEN
            };
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const decoded = yield methodAuthentication.decodeToken(accessToken, accessTokenSecret);
        if (!decoded) {
            return {
                'message': errMessage.ACCESS_TOKEN_INVALID
            };
        }
        const username = decoded.payload.username;
        const password = decoded.payload.password;
        const user = yield prisma_1.default.users.findFirst({
            where: {
                username: username
            }
        });
        if (!user) {
            return {
                'message': errMessage.NOT_FOUND_USER
            };
        }
        if (refreshToken !== user.refresh_token) {
            return {
                'message': errMessage.REFRESH_TOKEN_INVALID
            };
        }
        const dataForAccessToken = {
            username,
            password
        };
        const newAccessToken = yield methodAuthentication.generateToken(dataForAccessToken, accessTokenSecret, accessTokenLife);
        if (!newAccessToken) {
            return {
                'message': errMessage.CREATE_ACCESS_TOKEN_FAIL
            };
        }
        return { 'new-access-token': newAccessToken };
    });
}
exports.refreshToken = refreshToken;
