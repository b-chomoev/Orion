import express from "express";
import Cocktail from "../models/Cocktail";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (req, res, next) => {
    try {
        const cocktails = await Cocktail.find().populate("user");
        res.send(cocktails);
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const cocktail = await Cocktail.findById(id).populate("user");

        if (!cocktail) {
            res.status(404).send({error: 'Not found'});
            return;
        }

        res.send(cocktail);
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.post('/', imagesUpload.single('image'), auth,async (req, res, next) => {
    const reqWithUser = req as RequestWithUser;

    const parsedIngredients = req.body.ingredients ? JSON.parse(req.body.ingredients) : [];

    const newCocktail = {
        user: reqWithUser.user._id,
        name: req.body.name,
        image: req.file ? 'images' + req.file.filename : null,
        recipe: req.body.recipe,
        ingredients: parsedIngredients,
    }

    try {
        const cocktail = new Cocktail(newCocktail);
        await cocktail.save();
        res.send(cocktail);
    } catch (e) {
        next(e);
    }
});

export default cocktailsRouter;