import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/CookBook.png';
import img from '../../assets/Vector.svg';
function NavLinks() {
	const [isMenuVisible, setIsMenuVisible] = useState(false);

	function handleMenuButtonClick() {
		console.log('clicked');
		setIsMenuVisible((prevState) => !prevState);
	}
	return (
		<div className=' sticky bg-[#333333] opacity-95 z-50 top-0 flex items-center justify-between'>
			<img
				className='logo  p-3 md:w-fit md:h-15  '
				src={logo}
				alt='cookbook-logo'
			/>

			<div
				className='hamburger'
				onClick={handleMenuButtonClick}>
				<div className='hamburger_line'></div>
				<div className='hamburger_line'></div>
				<div className='hamburger_line'></div>
			</div>
			{isMenuVisible ? (
				<div className='menu absolute right-0 top-0 bg-[#333333] h-screen flex flex-col items-center w-1/2  pt-4'>
					<div
						className='hamburger  self-end '
						onClick={handleMenuButtonClick}>
						<div className='hamburger_line'></div>
						<div className='hamburger_line'></div>
						<div className='hamburger_line'></div>
					</div>
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
				</div>
			) : null}
		</div>
	);
}

export default NavLinks;
