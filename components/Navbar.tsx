/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Session } from '@supabase/auth-helpers-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

type Database = any;

const Navbar = ({ session }: { session: Session | null }) => {
	const supabaseClient = useSupabaseClient<Database>();
	const router = useRouter();

	// return (
	// 	<div>
	// 		{session ? (
	// 			<div className='mx-auto flex h-16 max-w-screen items-center justify-between px-4 bg-blue-light'>
	// 				<div className='flex w-0 flex-1 lg:hidden'>
	// 					<button
	// 						className='rounded-full bg-gray-100 p-2 text-gray-600'
	// 						type='button'
	// 					>
	// 						<span className='sr-only'>Account</span>
	// 						<svg
	// 							className='h-5 w-5'
	// 							fill='none'
	// 							stroke='currentColor'
	// 							viewBox='0 0 24 24'
	// 							xmlns='http://www.w3.org/2000/svg'
	// 						>
	// 							<path
	// 								d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
	// 								strokeLinecap='round'
	// 								strokeLinejoin='round'
	// 								strokeWidth='2'
	// 							></path>
	// 						</svg>
	// 					</button>
	// 				</div>

	// 				<div className='flex items-center gap-4'>
	// 					<Link href='/'>
	// 						<img
	// 							src='https://drive.google.com/uc?id=103bCnhP8bHe_B66bW2gypW83QqL1MAKu'
	// 							alt='Kollect Image Logo'
	// 							className='h-72'
	// 						/>
	// 					</Link>

	// 					<form className='mb-0 hidden lg:flex'>
	// 						<div className='relative'>
	// 							<input
	// 								className='h-10 rounded-lg border-gray-200 pr-10 text-sm placeholder-gray-300 focus:z-10'
	// 								placeholder=' Search...'
	// 								type='text'
	// 							/>

	// 							<button
	// 								type='submit'
	// 								className='absolute inset-y-0 right-0 mr-px rounded-r-lg p-2 text-gray-600'
	// 							>
	// 								<span className='sr-only'>Submit Search</span>
	// 								<svg
	// 									className='h-5 w-5'
	// 									fill='currentColor'
	// 									viewBox='0 0 20 20'
	// 									xmlns='http://www.w3.org/2000/svg'
	// 								>
	// 									<path
	// 										clipRule='evenodd'
	// 										d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
	// 										fillRule='evenodd'
	// 									></path>
	// 								</svg>
	// 							</button>
	// 						</div>
	// 					</form>
	// 				</div>

	// 				<div className='flex w-0 flex-1 justify-end lg:hidden'>
	// 					<button
	// 						className='rounded-full bg-gray-100 p-2 text-gray-500'
	// 						type='button'
	// 					>
	// 						<span className='sr-only'>Menu</span>
	// 						<svg
	// 							className='h-5 w-5'
	// 							fill='currentColor'
	// 							viewBox='0 0 20 20'
	// 							xmlns='http://www.w3.org/2000/svg'
	// 						>
	// 							<path
	// 								clipRule='evenodd'
	// 								d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
	// 								fillRule='evenodd'
	// 							></path>
	// 						</svg>
	// 					</button>
	// 				</div>

	// 				<nav
	// 					aria-label='Site Nav'
	// 					className='hidden items-center justify-center gap-8 text-sm font-medium lg:flex lg:w-0 lg:flex-1'
	// 				>
	// 					<Link className='text-gray-100' href='/'>
	// 						Home
	// 					</Link>
	// 					<a className='text-gray-100' href=''>
	// 						About
	// 					</a>
	// 					<a className='text-gray-100' href=''>
	// 						Blog
	// 					</a>
	// 					<Link className='text-gray-100' href='/update_account'>
	// 						Update Account
	// 					</Link>
	// 					<Link className='text-gray-100' href='/add_item'>
	// 						Add Collectible
	// 					</Link>
	// 					<Link className='text-gray-100' href='/my_collection'>
	// 						My Collection
	// 					</Link>
	// 				</nav>

	// 				<div className='hidden items-center gap-4 lg:flex'>
	// 					<Link
	// 						href='/'
	// 						className='rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-600'
	// 						onClick={async () => {
	// 							await supabaseClient.auth.signOut();
	// 						}}
	// 					>
	// 						Log out
	// 					</Link>
	// 					<Link href='/login'>
	// 						<span className='rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white'>
	// 							Account
	// 						</span>
	// 					</Link>
	// 				</div>
	// 			</div>
	// 		) : (
	// 			<div className='mx-auto flex h-16 max-w-screen items-center justify-between px-4 bg-blue-light'>
	// 				<div className='flex gap-4 text-white'>
	// 					<Link href='/'>
	// 						<img
	// 							src='https://drive.google.com/uc?id=103bCnhP8bHe_B66bW2gypW83QqL1MAKu'
	// 							alt='Kollect Club Logo'
	// 							className='h-72'
	// 						/>
	// 					</Link>
	// 				</div>

	// 				<div className='hidden items-center gap-4 lg:flex'>
	// 					{router.pathname !== '/signup' && (
	// 						<Link href='/signup'>
	// 							<span className='rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white'>
	// 								Sign up
	// 							</span>
	// 						</Link>
	// 					)}
	// 				</div>
	// 			</div>
	// 		)}

	// 		{session?.user && (
	// 			<div className='border-t border-gray-100 lg:hidden'>
	// 				<nav aria-label='Main Nav' className='flex flex-col space-y-1'>
	// 					<Link
	// 						href='/'
	// 						className='flex items-center px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg'
	// 					>
	// 						<svg
	// 							xmlns='http://www.w3.org/2000/svg'
	// 							className='w-5 h-5 opacity-75'
	// 							fill='none'
	// 							viewBox='0 0 24 24'
	// 							stroke='currentColor'
	// 							strokeWidth='2'
	// 						>
	// 							<path
	// 								strokeLinecap='round'
	// 								strokeLinejoin='round'
	// 								d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
	// 							/>
	// 							<path
	// 								strokeLinecap='round'
	// 								strokeLinejoin='round'
	// 								d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
	// 							/>
	// 						</svg>

	// 						<span className='ml-3 text-sm font-medium'> Home </span>
	// 					</Link>
	// 					<Link
	// 						href=''
	// 						className='flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'
	// 					>
	// 						<svg
	// 							xmlns='http://www.w3.org/2000/svg'
	// 							className='w-5 h-5 opacity-75'
	// 							fill='none'
	// 							viewBox='0 0 24 24'
	// 							stroke='currentColor'
	// 							strokeWidth='2'
	// 						>
	// 							<path
	// 								strokeLinecap='round'
	// 								strokeLinejoin='round'
	// 								d='M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
	// 							/>
	// 						</svg>

	// 						<span className='ml-3 text-sm font-medium'> About </span>
	// 					</Link>
	// 					<Link
	// 						href='/'
	// 						className='flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'
	// 					>
	// 						<svg
	// 							xmlns='http://www.w3.org/2000/svg'
	// 							className='w-5 h-5 opacity-75'
	// 							fill='none'
	// 							viewBox='0 0 24 24'
	// 							stroke='currentColor'
	// 							strokeWidth='2'
	// 						>
	// 							<path
	// 								strokeLinecap='round'
	// 								strokeLinejoin='round'
	// 								d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
	// 							/>
	// 						</svg>

	// 						<span className='ml-3 text-sm font-medium'> Blog </span>
	// 					</Link>
	// 					<details className='group [&_summary::-webkit-details-marker]:hidden'>
	// 						<summary className='flex items-center px-4 py-2 text-gray-500 rounded-lg group hover:bg-gray-100 hover:text-gray-700'>
	// 							<svg
	// 								xmlns='http://www.w3.org/2000/svg'
	// 								className='w-5 h-5 opacity-75'
	// 								fill='none'
	// 								viewBox='0 0 24 24'
	// 								stroke='currentColor'
	// 								strokeWidth='2'
	// 							>
	// 								<path
	// 									strokeLinecap='round'
	// 									strokeLinejoin='round'
	// 									d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
	// 								/>
	// 							</svg>

	// 							<span className='ml-3 text-sm font-medium'> Collectibles </span>

	// 							<span className='ml-auto transition duration-300 shrink-0 group-open:-rotate-180'>
	// 								<svg
	// 									xmlns='http://www.w3.org/2000/svg'
	// 									className='w-5 h-5'
	// 									viewBox='0 0 20 20'
	// 									fill='currentColor'
	// 								>
	// 									<path
	// 										fill-rule='evenodd'
	// 										d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
	// 										clip-rule='evenodd'
	// 									/>
	// 								</svg>
	// 							</span>
	// 						</summary>

	// 						<nav
	// 							aria-label='Users Nav'
	// 							className='flex flex-col mt-2 ml-8 space-y-1'
	// 						>
	// 							<Link
	// 								href='/add_item'
	// 								className='block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'
	// 							>
	// 								Add
	// 							</Link>

	// 							<Link
	// 								href='/my_collection'
	// 								className='block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'
	// 							>
	// 								View
	// 							</Link>
	// 						</nav>
	// 					</details>

	// 					<details className='group [&_summary::-webkit-details-marker]:hidden'>
	// 						<summary className='flex items-center px-4 py-2 text-gray-500 rounded-lg group hover:bg-gray-100 hover:text-gray-700'>
	// 							<svg
	// 								xmlns='http://www.w3.org/2000/svg'
	// 								className='w-5 h-5 opacity-75'
	// 								fill='none'
	// 								viewBox='0 0 24 24'
	// 								stroke='currentColor'
	// 								strokeWidth='2'
	// 							>
	// 								<path
	// 									strokeLinecap='round'
	// 									strokeLinejoin='round'
	// 									d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
	// 								/>
	// 							</svg>

	// 							<span className='ml-3 text-sm font-medium'> Account </span>

	// 							<span className='ml-auto transition duration-300 shrink-0 group-open:-rotate-180'>
	// 								<svg
	// 									xmlns='http://www.w3.org/2000/svg'
	// 									className='w-5 h-5'
	// 									viewBox='0 0 20 20'
	// 									fill='currentColor'
	// 								>
	// 									<path
	// 										fill-rule='evenodd'
	// 										d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
	// 										clip-rule='evenodd'
	// 									/>
	// 								</svg>
	// 							</span>
	// 						</summary>

	// 						<nav
	// 							aria-label='Account Nav'
	// 							className='flex flex-col mt-2 ml-8 space-y-1'
	// 						>
	// 							<a
	// 								href=''
	// 								className='block px-4 py-4 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'
	// 							>
	// 								Details
	// 							</a>

	// 							<Link
	// 								href='/update_account'
	// 								className='block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'
	// 							>
	// 								Update
	// 							</Link>

	// 							<form action='/logout'>
	// 								<button
	// 									type='submit'
	// 									className='w-full px-4 py-2 mb-2 text-sm font-medium text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'
	// 								>
	// 									Logout
	// 								</button>
	// 							</form>
	// 						</nav>
	// 					</details>
	// 				</nav>
	// 			</div>
	// 		)}
	// 	</div>
	// );
	return (
		<nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
			<div className='px-3 py-3 lg:px-5 lg:pl-3'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center justify-start'>
						<button
							data-drawer-target='logo-sidebar'
							data-drawer-toggle='logo-sidebar'
							aria-controls='logo-sidebar'
							type='button'
							className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
						>
							<span className='sr-only'>Open sidebar</span>
							<svg
								className='w-6 h-6'
								aria-hidden='true'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									clipRule='evenodd'
									fillRule='evenodd'
									d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
								></path>
							</svg>
						</button>
						<Link href='/' className='flex ml-2 md:mr-24'>
							{/* <img
								src='https://drive.google.com/uc?id=103bCnhP8bHe_B66bW2gypW83QqL1MAKu'
								alt='Kollect Club Logo'
								className='h-72'
							/> */}
							<span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
								Kollect Club
							</span>
						</Link>
					</div>
					<div className='flex items-center'>
						<div className='flex items-center ml-3'>
							<div>
								{session && (
									<Link
										className='flex text-sm bg-gray-100 p-2 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
										aria-expanded='false'
										data-dropdown-toggle='dropdown-user'
										href='/updateAccount'
									>
										<span className='sr-only'>Open user menu</span>
										<svg
											fill='none'
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											className='w-8 h-8 rounded-full'
											viewBox='0 0 24 24'
										>
											<path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2'></path>
											<circle cx='12' cy='7' r='4'></circle>
										</svg>
									</Link>
								)}
							</div>
							<div
								className='z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600'
								id='dropdown-user'
							>
								<div className='px-4 py-3' role='none'>
									<p
										className='text-sm text-gray-900 dark:text-white'
										role='none'
									>
										Neil Sims
									</p>
									<p
										className='text-sm font-medium text-gray-900 truncate dark:text-gray-300'
										role='none'
									>
										neil.sims@flowbite.com
									</p>
								</div>
								<ul className='py-1' role='none'>
									<li>
										<a
											href='#'
											className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
											role='menuitem'
										>
											Dashboard
										</a>
									</li>
									<li>
										<a
											href='#'
											className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
											role='menuitem'
										>
											Settings
										</a>
									</li>
									<li>
										<a
											href='#'
											className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
											role='menuitem'
										>
											Earnings
										</a>
									</li>
									<li>
										<a
											href='#'
											className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
											role='menuitem'
										>
											Sign out
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
