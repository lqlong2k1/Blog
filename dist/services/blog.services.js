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
exports.removeBlog = exports.updateBlog = exports.getBlogById = exports.getAllBlog = exports.createBlog = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const errMessage = __importStar(require("../const/err-messages.const"));
const successMessage = __importStar(require("../const/success-messages.const"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function createBlog(author_id, _a) {
    var rest = __rest(_a, []);
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Author id: ", author_id);
        const post = yield prisma_1.default.blog.create({
            data: Object.assign(Object.assign({}, rest), { author_id })
        });
        return post;
    });
}
exports.createBlog = createBlog;
function getAllBlog() {
    return __awaiter(this, void 0, void 0, function* () {
        const blogs = yield prisma_1.default.blog.findMany();
        return blogs;
    });
}
exports.getAllBlog = getAllBlog;
function getBlogById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const blog = yield prisma_1.default.blog.findFirst({
            where: {
                blog_id: id
            }
        });
        if (!blog) {
            return errMessage.NOT_FOUND_BLOG;
        }
        return blog;
    });
}
exports.getBlogById = getBlogById;
function updateBlog(id, blog) {
    return __awaiter(this, void 0, void 0, function* () {
        const isBlog = yield prisma_1.default.blog.findFirst({
            where: {
                blog_id: id
            }
        });
        if (!isBlog) {
            return errMessage.NOT_FOUND_BLOG;
        }
        const isUpdated = yield prisma_1.default.blog.update({
            where: {
                blog_id: id
            },
            data: {
                title: blog.title,
                content: blog.content,
                image: blog.image,
                category_id: blog.category_id
            }
        });
        if (!isUpdated) {
            errMessage.UPDATE_BLOG_FAIL;
        }
        return successMessage.UPDATE_BLOG_SUCCESS;
    });
}
exports.updateBlog = updateBlog;
function removeBlog(blogId) {
    return __awaiter(this, void 0, void 0, function* () {
        const isBlog = yield prisma_1.default.blog.findFirst({
            where: {
                blog_id: blogId
            }
        });
        if (!isBlog) {
            return errMessage.NOT_FOUND_BLOG;
        }
        const isRemoved = yield prisma_1.default.blog.delete({
            where: {
                blog_id: blogId
            }
        });
        if (!isRemoved)
            return errMessage.REMOVE_BLOG_FAIL;
        return successMessage.REMOVE_BLOG_SUCCESS;
    });
}
exports.removeBlog = removeBlog;
