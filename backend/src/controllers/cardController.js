
import Recipe from "../models/recipeModel.js";

const getOneCard = async (req, res, next) => {
  try {
    const recipeId = req.params.id;

    const recipes = await Recipe.find({ _id: recipeId })
    console.log(recipes)
    res.json(recipes);
  } catch (err) {
    next(new Error("cannot getOne" + err))
  }


};

const getAllCards = async (req, res, next) => {
  await Recipe.find().then((data) => {
    console.log(data)
    res.json(data);

  }).catch(() => {
    next(err + "Server error")
  });


}
const createCard = async (req, res, next) => {

  const newRecipe = new Recipe({
    title: req.body.title
  });
  await newRecipe.save().then(data => { console.log(data); res.json(data); }).catch(err => next(err + "  cannot create cards error"))


}

const deleteCard = async (req, res, next) => {
  // get recipe card id
  const recipeId = req.params.id;
  console.log(recipeId);
  //find recipe with that id in DB
  const recipe = await Recipe.findByIdAndDelete({ _id: recipeId });
  // send the deleted recipe back 
  res.json(recipe);
}


const updateCard = async (req, res, next) => {

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

