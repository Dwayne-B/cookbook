import { createContext, useEffect, useState ,useLayoutEffect} from 'react';

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const RecipeContext = createContext();

export default RecipeContext;

export function RecipeProvider({ children }) {
	// state
	const [currentPage, setCurPage] = useState('home');
	// const url = 'https://cookbook.herokuapp.com/api  ';
	const url =  'https://recipes-btrc.onrender.com/api';
	// const url = 'http://localhost:5000/api ';
	const edamamURL = 'https://recipes-btrc.onrender.com/edamamApi';
	// const edamamURL ='https://cookbook.herokuapp.com/edamamApi';
	// const edamamURL = 'http://localhost:5000/edamamApi';
	const [edamamRecipes, setEdamamRecipes] = useState();
	const [myRecipes, setMyRecipes] = useState();

	// get Initial recipes from API and DB
	useEffect(() => {

		
	
		try {
			const getData = async () => {
				const res = await fetch(url).then((data)=>{
					
						return data.json();
				}).then((data) => {
					console.log('DATA FROM SERVER', data)
				setEdamamRecipes(data.recipeAPI.hits);
				setMyRecipes(data.savedCards);

					return;
				})
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
