import express from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import router from './router';
import { config as dotenvConfig } from 'dotenv';
import connectDB from "./db/mongoDb";

dotenvConfig();

const app = express();
app.use(cors({
    origin: [`${process.env.URL_DEV}`, `${process.env.URL_PROD}`],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.post('/post1/test', (req, res) => {
    try {
        res.cookie("post1", '123456789djhjdfhsdpost1', {
            httpOnly: false,
            maxAge: 2 * 60 * 60 * 1000,
            secure: false,
            path: '/',
        });
        return res.status(200).json({
            success: true,
            message: `Нет ошибки post ${process.env.NODE_ENV}`,
        });
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: 'post Ошибка ' + error.message,
        });
    }
});

app.post('/post2/test', (req, res) => {
    try {
        res.cookie("post2", '123456789djhjdfhsdpost2', {
            httpOnly: true,
            maxAge: 2 * 60 * 60 * 1000,
            secure: true,
            path: '/',
        });
        return res.status(200).json({
            success: true,
            message: `Нет ошибки post2 ${process.env.NODE_ENV}`,
        });
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: 'post Ошибка ' + error.message,
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server start http://localhost:${PORT}/`);
});

app.use('/', router());

connectDB()

export default app;