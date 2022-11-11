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
const blogConst = __importStar(require("../const/blog.const"));
const errMessage = __importStar(require("../const/err-messages.const"));
const validationDataInput = {
    author_id: joi_1.default.number(),
    title: joi_1.default.string()
        .required()
        .messages({ 'string.base': errMessage.INVALID_TITLE_BLOG }),
    content: joi_1.default.string()
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_CONTENT_BLOG }),
    image: joi_1.default.string()
        .trim()
        .regex(blogConst.LINK_IMAGE_REGEX)
        .messages({ 'string.pattern.base': errMessage.INVALID_LINK_IMAGE }),
    category_id: joi_1.default.number()
        .required()
        .messages({ 'string.base': errMessage.INVALID_CATEGORY_ID }),
    total_rate: joi_1.default.number(),
};
exports.default = {
    dataBlog: {
        body: joi_1.default.object(validationDataInput),
    },
};
