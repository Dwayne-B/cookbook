import { useContext, useState } from 'react';
import RecipeContext from '../../Context/RecipeContext';

function SearchBar() {
	const { setEdamamRecipes, url, edamamURL } =
		useContext(RecipeContext);
	const [searchQuery, setSearchQuery] = useState('');
	const handleinpt = (e) => {
		setSearchQuery((prev) => {
			return (prev = e.target.value);
		});
	};
	const fetchRecipies = async (e) => {
		console.log(searchQuery);
		e.preventDefault();
		await fetch(edamamURL, {
			method: 'POST',
			body: JSON.stringify({ query: searchQuery }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('FWETCH DATA', data);
				setEdamamRecipes((prev) => {
					return (prev = data);
				});
				setSearchQuery('');
			});
	};
	return (
		<div className='z-10 searchBar  '>
			<form className='form  w-[25rem]  '>
				<input
					value={searchQuery}
					type='text'
					onChange={handleinpt}
				/>
				<button
					onClick={fetchRecipies}
					className=' px-2 bg-amber-400 '
					type='submit'>
					Get Recipe
				</button>
			</form>
		</div>
	);
}

export default SearchBar;
