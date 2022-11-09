import express from 'express';
import route from './routes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

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

route(app);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})
