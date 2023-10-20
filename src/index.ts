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
let urlClient = process.env.URL_PROD
if (process.env.NODE_ENV !== 'production') {
    urlClient = process.env.URL_DEV
}

app.use(cors({
    origin: urlClient,
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server start http://localhost:${PORT}/`);
});

app.use('/', router());

connectDB()

export default app;