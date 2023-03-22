import { useState } from 'react';

function CreateCard({ x, setData }) {
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
			await fetch(
				' https://recipe-node-project.herokuapp.com/api/',
				{
					method: 'POST',
					body: JSON.stringify({
						label: input.label,
						cusineType: input.cusineType,
						ingredients: input.ingredients,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)
				.then((res) => res.json())
				.then((updatedata) => {
					console.log(updatedata);
					setData([...x, updatedata]);
				});
		} else {
		}
	};
	return (
		<>
			<form
				className=' flex flex-col w-1/3'
				method='post'
				required>
				<input
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
					className='p-2'
					name='cusineType'
					value={input.cusineType}
					placeholder='type of cusine '
					onChange={handleInput}
				/>
				<input
					className='p-2'
					name='ingredients'
					placeholder='Ingredients seperate by commas'
					onChange={handleInput}
					value={input.ingredients}
				/>
				<button
					className='bg-amber-400 '
					type='submit'
					onClick={handleSubmit}>
					Create New Recipie
				</button>
			</form>
		</>
	);
}

export default CreateCard;
