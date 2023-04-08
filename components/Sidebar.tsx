/* eslint-disable @next/next/no-img-element */
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Database = any;

const Navbar = ({ session }: { session: Session | null }) => {
	const supabaseClient = useSupabaseClient<Database>();
	const router = useRouter();

	return (
		<div>
		<aside
			id='logo-sidebar'
			className='fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700'
			aria-label='Sidebar'
		>
			<div className='h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800'>
				<ul className='space-y-2'>
					<li>
						<Link
							href='/dashboard'
							className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
						>
							<svg
								aria-hidden='true'
								className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
								<path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
							</svg>
							<span className='ml-3'>Dashboard</span>
						</Link>
					</li>
					<li>
						<Link
							href='/myCollection'
							className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
						>
							<svg
								aria-hidden='true'
								className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'></path>
							</svg>
							<span className='flex-1 ml-3 whitespace-nowrap'>
								My Collection
							</span>
						</Link>
					</li>
					{/*<li>
						<a
							href='#'
							className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
						>
							<svg
								aria-hidden='true'
								className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
									clipRule='evenodd'
								></path>
							</svg>
							<span className='flex-1 ml-3 whitespace-nowrap'>Blog</span>
						</a>
					</li>*/}
					<li>
						<Link
							href='/add_item'
							className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
						>
							<svg
								aria-hidden='true'
								className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z'
									clipRule='evenodd'
								></path>
							</svg>
							<span className='flex-1 ml-3 whitespace-nowrap'>Add Item</span>
						</Link>
					</li>
					<li>
						<Link
							href='/'
							className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
							onClick={async () => {
								await supabaseClient.auth.signOut();
							}}
						>
							<svg
								aria-hidden='true'
								className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z'
									clipRule='evenodd'
								></path>
							</svg>
							<span className='flex-1 ml-3 whitespace-nowrap'>Log Out</span>
						</Link>
					</li>
				</ul>
			</div>
		</aside>


		{/*  bottom bar on mobile view */}
			<aside
				id='logo-sidebar'
				className='lg:hidden xl:hidden md:hidden fixed bottom-0 z-40 w-screen pt-6 bg-white border-r border-gray-20 dark:bg-gray-800 dark:border-gray-700'
				aria-label='Sidebar'
			>
				<div className='px-3 pb-4 bg-white dark:bg-gray-800'>
					<div className='flex space-x-10'>
						<div>
							<Link
								href='/dashboard'
								className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
							>
								<svg
									aria-hidden='true'
									className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
									<path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
								</svg>
							</Link>
						</div>
						<div>
							<Link
								href='/myCollection'
								className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
							>
								<svg
									aria-hidden='true'
									className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'></path>
								</svg>
							</Link>
						</div>
						<div>
							<a
								href='#'
								className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
							>
								<svg
									aria-hidden='true'
									className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
										clipRule='evenodd'
									></path>
								</svg>
							</a>
						</div>
						<div>
							<a
								href='#'
								className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
								onClick={async () => {
									await supabaseClient.auth.signOut();
								}}
							>
							<svg
								aria-hidden='true'
								className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z'
									clipRule='evenodd'
								></path>
							</svg>
							</a>
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
};

export default Navbar;
