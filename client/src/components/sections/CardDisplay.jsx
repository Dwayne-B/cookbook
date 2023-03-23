import { useContext, useState } from 'react';
import { TiPlus } from 'react-icons/ti';
import RecipeContext from '../../Context/RecipeContext';
function CardDisplay() {
	const { edamamRecipes, myRecipes, setMyRecipes, url } =
		useContext(RecipeContext);

	const [currentCard, setCurrentCard] = useState();

	const create = async (e, recipe) => {
		console.log(recipe);

		if (recipe) {
			await fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					label: recipe.label,
					cusineType: recipe.cuisineType[0],
					ingredients: recipe.ingredientLines,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((res) => res.json())
				.then((updatedata) => {
					setMyRecipes([...myRecipes, updatedata]);
				});
		} else {
		}
	};
	const handleShow = (e) => {
		const x = (e) => {
			console.log(e.target.id); //
			setCurrentCard(e.target.id);
		};

		currentCard === e.target.id
			? setCurrentCard(null)
			: x(e);
	};

	return (
		<div
			className=' flex
      md:flex-wrap
      md:justify-around
      md:flex-row
      flex-col
    items-center mt-12 mx-auto'>
			{edamamRecipes
				? edamamRecipes.map((r, i) => {
						return (
							<div
								className={`
max-w-[383px]
                  w-3/4  relative    bg-white   text-black  mb-5 flex  flex-col justify-between ${
										currentCard === i.toString()
											? 'h-fit'
											: 'min-h-[425px] max-h-[fit]'
									}
        `}
								key={i}>
								<button
									onClick={(e) => {
										create(e, r.recipe);
									}}
									className='  absolute -top-[10px] -right-[10px]
           w-14 rounded-full h-14 text-white bg-[#FFCE3E]  text-2xl '>
									<TiPlus className='m-auto' />
								</button>
								<img
									src={r.recipe.images.REGULAR.url}
									alt=''
									className=' w-full'
								/>

								<span className={`  p-4  `}>
									<h4>
										{r.recipe.cuisineType}:{' '}
										<span className='text-[#a7704f]'>
											{r.recipe.label}
										</span>
									</h4>

									<p>Dish type: {r.recipe.dishType}</p>
									<p>ingredients</p>
									<hr />
									{currentCard === i.toString() ? (
										<ul>
											{r.recipe.ingredients.map(
												(ingred, i) => {
													return (
														<li key={i}>{ingred.text}</li>
													);
												},
											)}
										</ul>
									) : null}
								</span>
								<button
									id={i}
									onClick={(e) => {
										console.log(e.target.id);
										handleShow(e);
									}}
									className='bg-[#FFCE3E]  '>
									{currentCard === i.toString()
										? 'hide ingredients'
										: 'Show ingredients'}
								</button>
							</div>
						);
				  })
				: 'null'}
		</div>
	);
}

export default CardDisplay;
