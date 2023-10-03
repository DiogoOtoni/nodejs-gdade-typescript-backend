import cors from 'cors';
import express from 'express';
import { router } from './routes/serverRoutes';

const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    app.use(cors());
    next();
});

app.use("/api", router);

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});

