import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const recipeSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  cusineType: String,
  ingredients: [{
    type: String
  }]

});

const RecipeModel = mongoose.model('recipe', recipeSchema);

export default RecipeModel