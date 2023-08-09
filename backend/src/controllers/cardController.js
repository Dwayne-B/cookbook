import Recipe from '../models/recipeModel.js';

const getOneCard = async (req, res, next) => {
	try {
		const recipeId = req.params.id;

		const recipes = await Recipe.find({ _id: recipeId });
		console.log(recipes);
		res.json(recipes);
	} catch (err) {
		next(new Error('cannot getOne' + err));
	}
};
/**
 * GETALLCARDS
 * route: /api/
 * Returns all cards in DB and data from edamam api*/
const getAllCards = async (req, res, next) => {
	await Recipe.find()
		.then((data) => {
			console.log(res.locals.data)
			const combinedResponse = {
				savedCards: data,
				recipeAPI: res.locals.data,
			};
			res.json(combinedResponse);
		})
		.catch(() => {
			next(err + 'Server error');
		});
};
const createCard = async (req, res, next) => {
	console.log(req.body);
	const newRecipe = new Recipe({
		label: req.body.label,
		cusineType: req.body.cusineType,
		ingredients: req.body.ingredients,
	});
	await newRecipe
		.save()
		.then((data) => {
			console.log(data);
			res.json(data);
		})
		.catch((err) =>
			next(err + '  cannot create cards error'),
		);
};

const deleteCard = async (req, res, next) => {
	// get recipe card id
	const recipeId = req.params.id;
	console.log(recipeId);
	//find recipe with that id in DB
	const recipe = await Recipe.findByIdAndDelete({
		_id: recipeId,
	});
	// send the deleted recipe back
	res.json(recipe);
};

const updateCard = async (req, res, next) => {
	// get recipe card id
	const recipeId = req.params.id;

	//find recipe with that id in DB
	const recipe = await Recipe.findByIdAndUpdate(
		{ _id: recipeId },
		{
			label: req.body.label,
			cusineType: req.body.cusineType,
			ingredients: req.body.ingredients,
		},
	);
	// send the deleted recipe back
	res.json(recipe);
};

export {
	getOneCard,
	getAllCards,
	createCard,
	deleteCard,
	updateCard,
};
