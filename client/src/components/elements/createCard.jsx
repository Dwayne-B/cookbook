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
	const [formError, setFormError] = useState(false);
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
		if (input.cusineType != '' && input.label != "" && input.ingredients != '') {
			await fetch(url, {
				mode: 'cors',
				method: 'POST',
				body: JSON.stringify({
					label: input.label,
					cusineType: input.cusineType,
					ingredients: input.ingredients,
				}),
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Methods': ' POST',
				},
			})
				.then((res) => res.json())
				.then((updatedata) => {
					console.log(updatedata);
					setMyRecipes([...myRecipes, updatedata]);
				});
		} else {
			// set form error to true
			setFormError(prev=>!prev)
		}
	};
	return (
		<>
		{formError? <h3 className='font-bold text-red-700 text-center mb-3 '>All fields must be filled in. </h3>:null}
			<form
				className='max-w-[383px] self-center flex flex-col w-3/4 '
				method='post'
				required>
				<input
					autoComplete='off'
					className='rounded-tr-lg rounded-tl-lg p-3'
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
					className='p-3'
					name='cusineType'
					value={input.cusineType}
					placeholder='type of cusine '
					onChange={handleInput}
					
				/>
				<input
					autoComplete='off'
					className='p-3'
					name='ingredients'
					placeholder='seperate ingredients by commas'
					onChange={handleInput}
					value={input.ingredients}
					required
				/>
				<button
					className='bg-amber-400 rounded-bl-lg rounded-br-lg p-3'
					type='submit'
					onClick={handleSubmit}>
					Create New Recipie
				</button>
			</form>
		</>
	);
}

export default CreateCard;
