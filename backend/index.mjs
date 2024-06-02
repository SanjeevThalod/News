import express from "express";
import Router from "./Routes/newRoutes.mjs";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());


app.use('/api',Router);


export default app;