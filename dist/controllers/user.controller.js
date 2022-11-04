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
Object.defineProperty(exports, "__esModule", { value: true });
const userServices = __importStar(require("../services/user.services"));
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userServices.getAllUsers();
        return res.json({
            method: 'GET',
            status: 'success',
            description: 'list all users',
            data: users
        });
    }
    catch (error) {
        throw res.status(400).json('ERROR: ' + error);
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        const user = yield userServices.getUserById(userId);
        return res.json({
            method: 'GET',
            status: 'success',
            description: 'get user by user ID',
            data: user
        });
    }
    catch (error) {
        throw res.status(400).json('ERROR: ' + error);
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userServices.createUser(req.body);
        return res.json({
            method: 'POST',
            status: 'success',
            description: 'Create a new user',
            data: user
        });
    }
    catch (error) {
        console.log(error);
        throw res.status(400).json('ERROR: ' + error);
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield userServices.login(req.body.username, req.body.password);
        if (data['refresh-token'] !== null) {
            res.cookie('refreshToken', data['refresh-token'], {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict'
            });
        }
        return res.json({
            method: 'POST',
            description: 'Login user',
            data: {
                'message': data.message,
                'accessToken': data['access-token']
            }
        });
    }
    catch (error) {
        throw res.status(400).json('ERROR: ' + error);
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        const userData = req.body;
        const isUpdated = yield userServices.updateUser(userId, userData);
        return res.json({
            method: 'PUT',
            status: 'success',
            description: 'Update user',
            data: isUpdated
        });
    }
    catch (error) {
        console.log(error);
        throw res.status(400).json('ERROR: ' + error);
    }
});
const removeUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        const user = yield userServices.removeUserById(userId);
        return res.json({
            method: 'DELETE',
            status: 'success',
            description: 'Delete user by user ID',
            data: user
        });
    }
    catch (error) {
        console.log(error);
        throw res.status(400).json('ERROR: ' + error);
    }
});
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.headers['access-token'];
        const refreshToken = req.cookies.refreshToken;
        console.log('------> test acc token: ', accessToken);
        console.log('------> test ref token: ', refreshToken);
        const newAccessToken = yield userServices.refreshToken(accessToken, refreshToken);
        return res.json({
            method: 'POST',
            status: 'success',
            description: 'Create a new access token when the old access token had expired',
            data: newAccessToken
        });
    }
    catch (error) {
        console.log(error);
        throw res.status(400).json('ERROR: ' + error);
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('refreshToken');
        return res.json({
            method: 'POST',
            status: 'success',
            description: 'Log out',
            data: 'Logout successfully'
        });
    }
    catch (error) {
        console.log(error);
        throw res.status(400).json('ERROR: ' + error);
    }
});
exports.default = {
    allUsers,
    getUserById,
    createUser,
    login,
    removeUserById,
    updateUser,
    logout,
    refreshToken
};
