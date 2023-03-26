import { motion } from 'framer-motion';
import React from 'react';
function Hamburger({
	isMenuVisible,
	handleMenuButtonClick,
	pos,
}) {
	const variants = {
		open: {
			rotate: [360, 0, 0],
			transition: { duration: 0.4 },
			scale: 1.25,
		},
		// You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
		close: {
			rotate: [-360, 0, 0],
			transition: { duration: 0.4 },
		},
	};
	return (
		<motion.div
			variants={variants}
			animate={isMenuVisible ? 'open' : 'close'}
			transition={{ duration: 0.4 }}
			className={
				pos === 'open' ? 'self-end hamburger' : 'hamburger'
			}
			onClick={handleMenuButtonClick}>
			<div className='hamburger_line'></div>
			<div className='hamburger_line'></div>
			<div className='hamburger_line'></div>
		</motion.div>
	);
}

export default Hamburger;
