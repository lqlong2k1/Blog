import express from 'express';
import route from './routes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cookieParser())
app.use(
    express.urlencoded({
        extended: true, //body-parser
    }),
); //middleware
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Blog API",
            description: "Blog API Information",
            contact: {
                name: "LongLQ2"
            },
            servers: ["http://localhost:8080"]
        }
    },
    // ['.routes/*.js']
    apis: [".routes/user.routes.ts"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

route(app);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})
