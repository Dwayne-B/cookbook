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
				'Access-Control-Allow-Methods': 'POST',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('Fetched DATA', data);
				// setEdamamRecipes((prev) => {
				// 	prev = data
				// 	return data;
				// });
				setEdamamRecipes(data.hits);
				setSearchQuery('');
			});
	};
	return (
		<div className='z-10 searchBar  '>
			<form className='form  w-[25rem]  '>
				<input
				className='py-2 px-3 rounded-l-md rouned-lr-md'
					value={searchQuery}
					type='text'
					onChange={handleinpt}
					placeholder='Tacos'
				/>
				<motion.button
					whileHover={{
						backgroundColor: '#6c5826',
					}}
					onClick={fetchRecipies}
					className=' py-2 px-3 rounded-r-md rouned-br-md ed-md bg-amber-400 '
					type='submit'>
					Get Recipe
				</motion.button>
			</form>
		</div>
	);
}

export default SearchBar;
