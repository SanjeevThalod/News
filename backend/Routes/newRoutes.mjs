import express from "express";
import { getNews } from "../Controller/newsController.mjs";
const Router = express.Router();

Router.get('/news',getNews);

export default Router;