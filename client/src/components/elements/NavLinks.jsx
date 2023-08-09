import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/CookBook.png';
import img from '../../assets/Vector.svg';
import Hamburger from './Hamburger';
function NavLinks() {
	const [isMenuVisible, setIsMenuVisible] = useState(false);

	function handleMenuButtonClick() {
		console.log('clicked');
		setIsMenuVisible((prevState) => !prevState);
	}
	return (
		<div className=' sticky bg-[#333333] opacity-95 z-50 top-0 flex items-center justify-between px-5'>
			<Link to='/'>
				<img
					className='logo  p-3   '
					src={logo}
					alt='cookbook-logo'
				/>
			</Link>
			<Hamburger
				pos={'closed'}
				isMenuVisible={isMenuVisible}
				handleMenuButtonClick={handleMenuButtonClick}
			/>
			{isMenuVisible ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { duration: 0.4 },
					}}
					className=' px-5 menu absolute right-0 top-0 bg-[#333333] h-screen flex flex-col items-center w-1/2  pt-4'>
					<Hamburger
						pos={'open'}
						isMenuVisible={isMenuVisible}
						handleMenuButtonClick={handleMenuButtonClick}
					/>
					<ul className='  px-4 py-2 flex flex-col justify-evenly items-center h-1/2'>
						<Link to='/'>
							{' '}
							<li className=' '>Search Recipe</li>
						</Link>

						<Link to='/SavedCardsPage'>
							<li>
								<img src={img} alt='' />
							</li>
						</Link>
					</ul>
				</motion.div>
			) : null}
		</div>
	);
}

export default NavLinks;
