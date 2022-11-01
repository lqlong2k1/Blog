import express from 'express';
import route from './routes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(cookieParser())
const PORT = process.env.PORT;

app.use(
    express.urlencoded({
        extended: true, //body-parser
    }),
); //middleware
app.use(express.json());
route(app);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})
