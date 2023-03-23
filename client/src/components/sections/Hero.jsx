import React from 'react';
import Searchbar from '../elements/SearchBar';
function Hero() {
	return (
		<div className=' cnt flex flex-col justify-evenly items-center'>
			<h1 className='text-5xl z-10'>Search Recipes</h1>
			<Searchbar />
		</div>
	);
}

export default Hero;
