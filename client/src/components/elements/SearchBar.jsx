import { motion } from 'framer-motion';
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
			mode: 'cors',
			method: 'POST',
			body: JSON.stringify({ query: searchQuery }),
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Methods': ' POST',
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
				<motion.button
					whileHover={{
						backgroundColor: '#6c5826',
					}}
					onClick={fetchRecipies}
					className=' px-2 bg-amber-400 '
					type='submit'>
					Get Recipe
				</motion.button>
			</form>
		</div>
	);
}

export default SearchBar;
