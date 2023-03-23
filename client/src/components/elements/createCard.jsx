import { useContext, useState } from 'react';
import RecipeContext from '../../Context/RecipeContext';
function CreateCard() {
	const { myRecipes, setMyRecipes, url } =
		useContext(RecipeContext);
	const [input, setInput] = useState({
		label: '',
		cusineType: '',
		ingredients: [],
	});

	const handleInput = (e) => {
		setInput((prevState) => {
			const property = e.target.name;
			if (property === 'ingredients') {
				let ing = e.target.value.split([',']);
				prevState[property] = ing;
				return { ...prevState };
			} else {
				prevState[property] = e.target.value;
				console.log('other');

				return { ...prevState };
			}
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		create();
		setInput((prevState) => {
			return {
				label: '',
				cusineType: '',
				ingredients: [''],
			};
		});
	};
	const create = async () => {
		if (input) {
			await fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					label: input.label,
					cusineType: input.cusineType,
					ingredients: input.ingredients,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((res) => res.json())
				.then((updatedata) => {
					console.log(updatedata);
					setMyRecipes([...myRecipes, updatedata]);
				});
		} else {
		}
	};
	return (
		<>
			<form
				className='max-w-[383px] self-center flex flex-col w-3/4'
				method='post'
				required>
				<input
					autoComplete='off'
					className='p-2'
					placeholder='name'
					value={input.label}
					onChange={handleInput}
					type='text'
					required
					name='label'
					id=''
				/>
				<input
					autoComplete='off'
					className='p-2'
					name='cusineType'
					value={input.cusineType}
					placeholder='type of cusine '
					onChange={handleInput}
				/>
				<input
					autoComplete='off'
					className='p-2'
					name='ingredients'
					placeholder='seperate ingredients by commas'
					onChange={handleInput}
					value={input.ingredients}
				/>
				<button
					className='bg-amber-400'
					type='submit'
					onClick={handleSubmit}>
					Create New Recipie
				</button>
			</form>
		</>
	);
}

export default CreateCard;
