import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const recipeSchema = new Schema({
  title: String,

});

const RecipeModel = mongoose.model('recipe', recipeSchema);

export default RecipeModel