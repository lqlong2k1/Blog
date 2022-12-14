"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validation_1 = require("express-validation");
const user_routes_1 = __importDefault(require("./user.routes"));
const blog_routes_1 = __importDefault(require("./blog.routes"));
const swagger_routes_1 = __importDefault(require("./swagger.routes"));
function route(app) {
    app.use('/swagger', swagger_routes_1.default);
    app.use('/users', user_routes_1.default);
    app.use('/blogs', blog_routes_1.default);
    app.use((req, res) => {
        res.status(404).send({
            'Message': 'ERROR: Page not found'
        });
    });
    app.use((err, req, res, next) => {
        console.log(err);
        if (err instanceof express_validation_1.ValidationError) {
            console.log(err);
            res.status(400).send(err.details[0]);
        }
        res.status(err.statusCode).send({
            'Message': 'ERROR: Something has broken'
        });
    });
}
exports.default = route;
