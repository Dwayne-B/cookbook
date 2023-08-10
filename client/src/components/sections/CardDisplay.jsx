import { motion } from 'framer-motion';
import { useContext, useRef, useState } from 'react';
import Card from '../elements/Card'
import RecipeContext from '../../Context/RecipeContext';

function CardDisplay() {

	
	const addBtnRef = useRef(null);

	const [addbtn, setAddBtn] = useState(null);
	const [click, setClick] = useState(false);
	const {edamamRecipes} = useContext(RecipeContext); 

	const variants = {
		click: {
			rotate: 360,
			transition: { duration: 0.4 },
			scale: 1.25,
		},
		nothing: {
			scale: 1,
			transition: {
				duration: 0.6,
			},
		},
	};

	const [currentCard, setCurrentCard] = useState();

	
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
	<div className='p-12 flex flex-wrap gap-12 justify-center '>
		
		{
			edamamRecipes?
			edamamRecipes.map((card,i)=>{
				return(<Card key={i} card={card}/>)

			})
			
			:<h1>LOADING RECIPES...</h1>
		}
	</div>
	);
}

export default CardDisplay;
