import React from 'react';

const CallToAction = () => {
	return (
		<div className='flex items-center justify-center py-20 mb-4 rounded bg-gray-dark'>
			<div className='mx-auto max-w-3xl text-center'>
				<h1 className='bg-gradient-to-r from-purple-300 via-purple-600 to-purple-800 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl'>
					Kollect Club
					<span className='sm:block'>Collection Manager</span>
				</h1>

				<p className='mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed text-white'>
					We enable you to manage and monitor you collectibles
				</p>

				<div className='mt-8 flex flex-wrap justify-center gap-4'>
					<a
						className='block w-full rounded border border-purple-600 bg-purple-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto'
						href='/get-started'
					>
						Get Started!
					</a>
				</div>
			</div>
		</div>
	);
};

export default CallToAction;
