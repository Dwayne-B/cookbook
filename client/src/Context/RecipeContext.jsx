import { createContext, useEffect, useState } from 'react';

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const RecipeContext = createContext();

export default RecipeContext;

export function RecipeProvider({ children }) {
	// state
	const [currentPage, setCurPage] = useState('home');
	// const url = "https://recipe-node-project.herokuapp.com/api  ";
	const url = 'http://localhost:5000/api ';
	// const edamamURL = 'https://recipe-node-project.herokuapp.com/edamamApi'
	const edamamURL = 'http://localhost:5000/edamamApi';
	const [edamamRecipes, setEdamamRecipes] = useState();
	const [myRecipes, setMyRecipes] = useState();
	// get Initial recipes from API and DB
	useEffect(() => {
		console.log('get initial recipes use Effect');
		try {
			const getData = async () => {
				const res = await fetch(url).then((data) =>
					data.json(),
				);
				/*  take combined data and set state accordingly*/
				if (!edamamRecipes && !myRecipes) {
					setEdamamRecipes(res.recipeAPI);
					setMyRecipes(res.savedCards);
				} else {
					return null;
				}
			};

			getData();
		} catch (error) {
			console.error(error);
		}
	}, []);
	return (
		<RecipeContext.Provider
			value={{
				edamamRecipes,
				setEdamamRecipes,
				myRecipes,
				setMyRecipes,
				url,
				edamamURL,
			}}>
			{children}
		</RecipeContext.Provider>
	);
}
