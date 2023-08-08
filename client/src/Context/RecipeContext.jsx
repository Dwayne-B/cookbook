import { createContext, useEffect, useState ,useLayoutEffect} from 'react';

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const RecipeContext = createContext();

export default RecipeContext;

export function RecipeProvider({ children }) {
	// state
	const [currentPage, setCurPage] = useState('home');
	// const url = 'https://cookbook.herokuapp.com/api  ';
	const url = 'http://localhost:5000/ ';
	// const edamamURL ='https://cookbook.herokuapp.com/edamamApi';
	const edamamURL = 'http://localhost:5000/edamamApi';
	const [edamamRecipes, setEdamamRecipes] = useState(null);
	const [myRecipes, setMyRecipes] = useState();
	// get Initial recipes from API and DB
	useEffect(() => {
		console.log('get initial recipes use Effect');
		try {
			const getData = async () => {
				const res = await fetch(url).then((data)=>{
					
						return data.json();
				}).then((data) => {
					
				setEdamamRecipes(data.hits );
					return;
				})
				// setMyRecipes(res.savedCards);
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
