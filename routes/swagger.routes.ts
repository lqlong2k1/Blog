import { Router } from "express";
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const router = Router();

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Blog API",
            version: "1.0.0",
            description: "Blog API",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
        tags: [{
            name: "user",
            description: "Everything about user"
        },
        {
            name: "blog",
            description: "Everything about post in blog"
        }
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
const swaggerDocs = swaggerJsDoc(swaggerOptions);

router.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

export default router;

