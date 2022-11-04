"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validation_1 = require("express-validation");
const blog_validation_1 = __importDefault(require("../validation/blog.validation"));
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const admin_middware_1 = __importDefault(require("../middlewares/admin.middware"));
const blog_controllers_1 = __importDefault(require("../controllers/blog.controllers"));
const router = express_1.default.Router();
router.get('/', user_middleware_1.default.authenToken, blog_controllers_1.default.getAllBlogs);
router.post('/', user_middleware_1.default.authenToken, admin_middware_1.default.checkAdminAuthentication, [(0, express_validation_1.validate)(blog_validation_1.default.createBlog, { keyByField: true }, {})], blog_controllers_1.default.createBlog);
router.put('/:id', user_middleware_1.default.authenToken, admin_middware_1.default.checkAdminAuthentication, [(0, express_validation_1.validate)(blog_validation_1.default.createBlog, { keyByField: true }, {})], blog_controllers_1.default.updateBlog);
router.get('/:id', user_middleware_1.default.authenToken, blog_controllers_1.default.getBlogById);
router.delete('/:id', user_middleware_1.default.authenToken, admin_middware_1.default.checkAdminAuthentication, blog_controllers_1.default.removeBlog);
exports.default = router;
