import express from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './router';



const app = express();

app.use(cors({
    credentials: true,
}));

app.use(cookieParser());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/');
});

app.use('/', router());