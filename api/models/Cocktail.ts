import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CocktailSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        required: true,
        type: String,
    },
    recipe: {
        required: true,
        type: String,
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    },
    ingredients: [{
        name: {type: String, required: true},
        amount: {type: String, required: true}
    }]
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

export default Cocktail;