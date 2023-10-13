import express from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './router';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const app = express();
app.use(cors({
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server start http://localhost:${process.env.PORT || 3000}/`);
});

app.use('/', router());


mongoose.connect(`${process.env.MONGO_CONNECT}`)
    .then(() => console.log('mongoose connect'))
    .catch((error) => console.log('mongoose error', error))