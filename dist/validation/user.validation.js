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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userConst = __importStar(require("../const/user.const"));
const errMessage = __importStar(require("../const/err-messages.const"));
const validateDataInput = {
    username: joi_1.default.string()
        .min(6).messages({ 'string.min': errMessage.MINIMUM_LENGTH_USERNAME })
        .regex(userConst.USERNAME_REGEX)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_USERNAME }),
    password: joi_1.default.string()
        .min(8)
        .required()
        .messages({ 'string.min': errMessage.INVALID_PASSWORD }),
    full_name: joi_1.default.string()
        .trim()
        .regex(userConst.NAME_REGEX)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_NAME }),
    profile_img: joi_1.default.string()
        .trim()
        .regex(userConst.LINK_IMAGE_REGEX)
        .messages({ 'string.pattern.base': errMessage.INVALID_LINK_IMAGE }),
    email: joi_1.default.string()
        .trim()
        .regex(userConst.EMAIL_REGEX)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_EMAIL }),
    phone_number: joi_1.default.string()
        .trim()
        .regex(userConst.PHONE_NUMBER_REGEX)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_PHONE_NUMBER }),
    country: joi_1.default.string()
        .trim()
        .required()
        .messages({ 'string.base': errMessage.INVALID_COUNTRY }),
    dob: joi_1.default.date()
        .max('01-01-2004')
        .iso()
        .required()
        .messages({
        'date.format': errMessage.INVALID_FORMAT_BIRTHDAY,
        'date.max': errMessage.INVALID_MINIMUN_BIRTHDAY,
    }),
    roles: joi_1.default.number()
};
const validateDataLogin = {
    username: joi_1.default.string()
        .min(6).messages({ 'string.min': errMessage.MINIMUM_LENGTH_USERNAME })
        .regex(userConst.USERNAME_REGEX)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_USERNAME }),
    password: joi_1.default.string()
        .min(8)
        .required()
        .messages({ 'string.min': errMessage.INVALID_PASSWORD }),
};
exports.default = {
    DataUser: {
        body: joi_1.default.object(validateDataInput),
    },
    DataLogin: {
        body: joi_1.default.object(validateDataLogin)
    }
};
