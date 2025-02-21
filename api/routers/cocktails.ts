import express from "express";
import Cocktail from "../models/Cocktail";

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (req, res, next) => {
    try {
        const cocktails = await Cocktail.find().populate("user");
        res.send(cocktails);
    } catch (e) {
        next(e);
    }
});

export default cocktailsRouter;