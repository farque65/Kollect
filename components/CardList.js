// @ts-nocheck
// /pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Card from '../components/Card';

export default function CardList({ session, collectibles }) {
	return (
		<div className='mx-auto  py-10 bg-blue-light'>
			<div className='border-2 border-blue-light mb-10 mt-10'>
				<div class='mx-auto flex max-w-screen items-center justify-between px-4'>
					<nav
						aria-label='Site Nav'
						class='hidden items-center justify-center gap-8 text-sm font-medium lg:flex lg:w-0 lg:flex-1'
					>
						<a
							className='rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white'
							href=''
						>
							About
						</a>
						<a
							className='rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white'
							href=''
						>
							Blog
						</a>
						<a
							className='rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white'
							href=''
						>
							Projects
						</a>
						<a
							className='rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white'
							href=''
						>
							Contact
						</a>
					</nav>
				</div>

				<div class='border-t border-gray-100 lg:hidden'>
					<nav class='flex items-center justify-center overflow-x-auto p-4 text-sm font-medium'>
						<a
							className='rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white ml-2'
							href=''
						>
							About
						</a>
						<a
							className='rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white ml-2'
							href=''
						>
							Blog
						</a>
						<a
							className='rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white ml-2'
							href=''
						>
							Projects
						</a>
						<a
							className='rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white ml-2'
							href=''
						>
							Contact
						</a>
					</nav>
				</div>
			</div>

			<div className='flex flex-wrap md:-m-4 md:px-4'>
				{collectibles &&
					collectibles.map((item, i) => (
						<Card
							key={`${item.year_manufactured}-${i}`}
							type={item.type}
							year_manufactured={item.year_manufactured}
							grade={item.grade}
						/>
					))}
			</div>
		</div>
	);
}
