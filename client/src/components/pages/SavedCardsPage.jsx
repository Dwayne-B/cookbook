import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import RecipeContext from '../../Context/RecipeContext';
import CreateCard from '../elements/createCard';
function SavedCardsPage() {
	const { myRecipes, setMyRecipes } =
		useContext(RecipeContext);
	const [editState, setEditState] = useState(false);
	const [show, setShow] = useState(false);
	const [update, setUpdate] = useState({
		label: '',
		cusineType: '',
		ingredients: [],
	});
	const [currentCard, setCurrentCard] = useState();

	const handleShow = (e) => {
		setShow(!show);
		setEditState(false);
		currentCard === e.target.id && setCurrentCard(null);
		setCurrentCard(e.target.id);
	};

	const handleUpdate = (e) => {
		setUpdate((prevState) => {
			const property = e.target.name;
			if (property === 'ingredients') {
		
				let ing = e.target.value.split([',']);
				prevState[property] = ing;
				return { ...prevState };
			} else {
				prevState[property] = e.target.value;
			
				return { ...prevState };
			}
		});
	};

	const handle = (e, recipe) => {
		currentCard === e.target.id && setCurrentCard(null);
		console.log(e.target.innerHTML);

		if (e.target.innerHTML === 'Edit') {
			setCurrentCard(e.target.id);
			setEditState(true);
			setShow(false);
			setUpdate((prevState) => {
				prevState = {
					label: recipe.label,
					cusineType: recipe.cusineType,
					ingredients: recipe.ingredients,
				};
				return prevState;
			});
		} else if (e.target.innerHTML === 'Submit') {
			setEditState(false);
			setShow(false);

			/*
       I am using patch instead of update because only one field is likely to be updated at a time.
*/
			// https://recipe-node-project.herokuapp.com/api/updateCard/${e.target.id}
			// `http://localhost:5000/api/updateCard/${e.target.id}`;
			fetch(
				`https://recipes-btrc.onrender.com/api/updateCard/${e.target.id}`
				,
				{
					mode: 'cors',
					method: 'PATCH',
					body: JSON.stringify({
						label: update.label,
						cusineType: update.cusineType,
						ingredients: update.ingredients,
					}),
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Methods': '*',
					},
				},
			)
				.then((res) => res.json())
				.then((data) => {
					setMyRecipes(
						myRecipes.map((recipe, i) => {
							if (recipe._id === e.target.id) {
								console.log('to change', recipe);
								recipe.label = update.label;
								recipe.cusineType = update.cusineType;
								recipe.ingredients = update.ingredients;
							}
							return recipe;
						}),
					);
				});
		} else if (e.target.innerHTML === 'Delete') {
			// delete
			//	`https://cookbook.herokuapp.com/api/deleteCard/${e.target.id}`
			// localhost:5000/api/deleteCard/${e.target.id}
			 fetch(
				`https://recipes-btrc.onrender.com/api/deleteCard/${e.target.id}`,
				{
					mode: 'cors',
					method: 'DELETE',
				},
			)
				.then((res) => {
					res.json();
				})
				.then((data) => {
					setMyRecipes(
						myRecipes.filter((recipe) => {
							return recipe._id != e.target.id;
						}),
					);
				});
		}
	};

	return (
		<div className=' flex flex-col mt-14 min-h-screen '>
			<h2 className='self-start mb-12 ml-5'>
				Create your own Recipe
			</h2>

			<CreateCard />

			<h2 className='self-start my-12 ml-5'>
				Saved Recipes
			</h2>
			<div className='flex lg:flex-wrap lg:flex-row flex-col items-center justify-center gap-7 '>
				{myRecipes ? (
					myRecipes.map((recipe, i) => {
						return (
							<div
								key={i}
								className={` lg:w-[30%]    flex  flex-col
						justify-between max-h-max m-auto bg-slate-600  min-w-[250px] max-w-[30%] my-5  p-5  break-words rounded-xl ${
							currentCard === recipe._id && show
								? '  h-fit '
								: ' '
						}
        `}
								id={recipe._id}>
								<span className={`p-4 `} key={i}>
									{currentCard === recipe._id &&
									editState === true ? (
										<input
											name='label'
											type='text'
											placeholder=' recipe name'
											className=' w-40 border flex justify-between'
											value={update.label}
											onChange={handleUpdate}
										/>
									) : (
										<h4>{recipe.label}</h4>
									)}
									{currentCard === recipe._id &&
									editState === true ? (
										<input
											name='cusineType'
											type='text'
											placeholder=' Dish type'
											className=' w-40 border flex justify-between'
											value={update.cusineType}
											onChange={handleUpdate}
										/>
									) : (
										<p>Dish type: {recipe.cusineType}</p>
									)}

									<p>ingredients</p>
									<hr />
									{currentCard === recipe._id &&
									editState === true ? (
										<input
											name='ingredients'
											type='text'
											placeholder='seperate ingredients by commas'
											className=' w-40 border flex justify-between'
											value={update.ingredients}
											onChange={handleUpdate}
										/>
									) : currentCard === recipe._id && show ? (
										<ul>
											{recipe.ingredients.map((ing, i) => {
												return <li key={i}>{ing}</li>;
											})}
										</ul>
									) : null}
								</span>
								<div className='flex flex-col '>
									<motion.button
										whileHover={{
											backgroundColor: '#1b2683',
											color: '#fff',
										}}
										id={recipe._id}
										className='bg-blue-700'
										type='submit'
										onClick={(e) => {
											handle(e, recipe);
										}}>
										{currentCard === recipe._id &&
										editState === true
											? 'Submit'
											: 'Edit'}
									</motion.button>
									<motion.button
										whileHover={{
											backgroundColor: '#6c2626',
											color: '#fff',
										}}
										id={recipe._id}
										className='bg-red-700'
										type='submit'
										onClick={(e) => {
											handle(e);
										}}>
										Delete
									</motion.button>

									<motion.button
										whileHover={{
											backgroundColor: '#6c5826',
											color: '#fff',
										}}
										id={recipe._id}
										onClick={(e) => {
											handleShow(e);
										}}
										className='bg-[#FFCE3E] '>
										{currentCard === recipe._id && show
											? 'Hide ingredients'
											: 'Show ingredients'}
									</motion.button>
								</div>
							</div>
						);
					})
				) : (
					<p>Loading your recipes</p>
				)}
			</div>
		</div>
	);
}

export default SavedCardsPage;
