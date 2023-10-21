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
    origin: ['http://localhost:3000', 'https://app-frontend-puble.vercel.app'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.post('/post/test', (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'Нет ошибки post',
        });
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: 'post Ошибка ' + error.message,
        });
    }
});

app.get('/get/test', (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'Нет ошибки get',
        });
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: 'get Ошибка ' + error.message,
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server start http://localhost:${PORT}/`);
});

app.use('/', router());

connectDB()

export default app;