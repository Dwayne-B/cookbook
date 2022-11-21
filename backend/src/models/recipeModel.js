import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  }

});

const RecipeModel = mongoose.model('recipe', recipeSchema);

export default RecipeModel