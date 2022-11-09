"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const router = (0, express_1.Router)();
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User API",
            version: "1.0.0",
            description: "Blog API",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "apiKey",
                    name: "access-token",
                    scheme: "bearer",
                    in: "header",
                },
            },
        },
        security: [
            {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                },
            },
        ],
    },
    apis: ["./routes/*.ts"]
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
router.use('/', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
exports.default = router;
