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
const blogServices = __importStar(require("../services/blog.services"));
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blogServices.getAllBlog();
        return res.json({
            method: 'GET',
            status: 'success',
            description: 'list all blogs',
            data: blogs
        });
    }
    catch (error) {
        throw res.status(400).json('ERROR: ' + error);
    }
});
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = Number(req.params.id);
        const blog = yield blogServices.getBlogById(blogId);
        return res.json({
            method: 'GET',
            status: 'success',
            description: 'get blog by blog ID',
            data: blog
        });
    }
    catch (error) {
        console.log(error);
        throw res.status(400).json('ERROR: ' + error);
    }
});
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.admin);
        const authorId = req.admin.id;
        const user = yield blogServices.createBlog(authorId, req.body);
        return res.json({
            method: 'POST',
            status: 'success',
            description: 'Create a new blog',
            data: user
        });
    }
    catch (error) {
        console.log(error);
        throw res.status(400).json('ERROR: ' + error);
    }
});
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = Number(req.params.id);
        const blogData = req.body;
        const isUpdated = yield blogServices.updateBlog(blogId, blogData);
        return res.json({
            method: 'PUT',
            status: 'success',
            description: 'Update blog',
            data: isUpdated
        });
    }
    catch (error) {
        console.log(error);
        throw res.status(400).json('ERROR: ' + error);
    }
});
const removeBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = Number(req.params.id);
        const isRemoved = yield blogServices.removeBlog(blogId);
        return res.json({
            method: 'DELETE',
            status: 'success',
            description: 'Remove blog by blog ID',
            data: isRemoved
        });
    }
    catch (error) {
        console.log(error);
        throw res.status(400).json('ERROR: ' + error);
    }
});
exports.default = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    removeBlog
};
