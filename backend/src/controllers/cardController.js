
import Recipe from "../models/recipeModel.js";

const getOneCard = async (req, res,) => {
  const recipeId = req.params.id
  const recipies = await Recipe.find({ _id: recipeId });
  res.json(recipies);
}

const getAllCards = async (req, res) => {
  const recipies = await Recipe.find();
  res.json(recipies);
}
const createCard = async (req, res) => {
  const errorMSG = "there was an error posting your new recipie....her is the error thrown....";
  try {
    const newRecipe = new Recipe({
      title: req.body.title
    });
    const json = await newRecipe.save()
    res.json(json);
  } catch (error) {
    console.log(errorMSG + error)
    res.json(errorMSG + error);
  }
}

const deleteCard = async (req, res) => {
  // get recipe card id
  const recipeId = req.params.id;
  console.log(recipeId);
  //find recipe with that id in DB
  const recipe = await Recipe.findByIdAndDelete({ _id: recipeId });
  // send the deleted recipe back 
  res.json(recipe);
}


const updateCard = async (req, res) => {

  // get recipe card id
  const recipeId = req.params.id;
  console.log(recipeId, req.body.title);
  //find recipe with that id in DB
  const recipe = await Recipe.findByIdAndUpdate({ _id: recipeId }, { title: req.body.title });
  // send the deleted recipe back 
  res.json(recipe);
}


export {
  getOneCard, getAllCards, createCard, deleteCard,
  updateCard
};

