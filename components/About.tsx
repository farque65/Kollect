import React from 'react';

const features = [
	{
		name: 'Manage Your Collectibles',
		description: 'An easy to use website',
		icon: (
			<svg
				fill='none'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
				className='w-4 h-4 ml-2'
				viewBox='0 0 24 24'
			>
				<path d='M5 12h14M12 5l7 7-7 7'></path>
			</svg>
		),
	},
	{
		name: 'Easily view your goods',
		description: 'Updates on your items happening regularily',
		icon: (
			<svg
				fill='none'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
				className='w-4 h-4 ml-2'
				viewBox='0 0 24 24'
			>
				<path d='M5 12h14M12 5l7 7-7 7'></path>
			</svg>
		),
	},
	{
		name: 'Get updates on collectibles',
		description: 'We gather and find the best news relevant to you',
		icon: (
			<svg
				fill='none'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
				className='w-4 h-4 ml-2'
				viewBox='0 0 24 24'
			>
				<path d='M5 12h14M12 5l7 7-7 7'></path>
			</svg>
		),
	},
];

const About = () => {
	return (
		<div className='py-12 bg-purple-800' id='about_section'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<h2 className='mt-6 text-center text-5xl text-white'>
					Power up your Collectible Experience
				</h2>
				<div className='mt-10'>
					<dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10'>
						{features.map((feature) => (
							<div key={feature.name} className='relative'>
								<dt>
									<div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-white text-black'>
										{feature.icon}
									</div>
									<p className='ml-16 text-lg leading-6 font-bold text-white'>
										{feature.name}
									</p>
								</dt>
								<dd className='mt-2 ml-16 text-base text-white'>
									{feature.description}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
};

export default About;
