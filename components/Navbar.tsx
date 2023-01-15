import Link from 'next/link';
import React from 'react';
import { Session } from '@supabase/auth-helpers-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

type Database = any;

const Navbar = ({ session }: { session: Session | null }) => {
	const supabaseClient = useSupabaseClient<Database>();
	return (
		<div>
			{session ? (
				<div className='mx-auto flex h-16 max-w-screen items-center justify-between px-4 bg-blue-light'>
					<div className='flex w-0 flex-1 lg:hidden'>
						<button
							className='rounded-full bg-gray-100 p-2 text-gray-600'
							type='button'
						>
							<span className='sr-only'>Account</span>
							<svg
								className='h-5 w-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
								></path>
							</svg>
						</button>
					</div>

					<div className='flex items-center gap-4'>
						<a href='#'>
							<span className='sr-only'>Kollect Club</span>
							<span className='h-10 w-20 rounded-lg bg-gray-200 px-10 py-2'>
								Kollect Club
							</span>
						</a>

						<form className='mb-0 hidden lg:flex'>
							<div className='relative'>
								<input
									className='h-10 rounded-lg border-gray-200 pr-10 text-sm placeholder-gray-300 focus:z-10'
									placeholder=' Search...'
									type='text'
								/>

								<button
									type='submit'
									className='absolute inset-y-0 right-0 mr-px rounded-r-lg p-2 text-gray-600'
								>
									<span className='sr-only'>Submit Search</span>
									<svg
										className='h-5 w-5'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											clipRule='evenodd'
											d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
											fillRule='evenodd'
										></path>
									</svg>
								</button>
							</div>
						</form>
					</div>

					<div className='flex w-0 flex-1 justify-end lg:hidden'>
						<button
							className='rounded-full bg-gray-100 p-2 text-gray-500'
							type='button'
						>
							<span className='sr-only'>Menu</span>
							<svg
								className='h-5 w-5'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									clipRule='evenodd'
									d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
									fillRule='evenodd'
								></path>
							</svg>
						</button>
					</div>

					<nav
						aria-label='Site Nav'
						className='hidden items-center justify-center gap-8 text-sm font-medium lg:flex lg:w-0 lg:flex-1'
					>
						<Link className='text-gray-100' href='/'>
							Home
						</Link>
						<a className='text-gray-100' href=''>
							About
						</a>
						<a className='text-gray-100' href=''>
							Blog
						</a>
						<Link className='text-gray-100' href='/update_account'>
							Update Account
						</Link>
						<Link className='text-gray-100' href='/add_item'>
							Add Collectible
						</Link>
						<Link className='text-gray-100' href='/my_collection'>
							My Collection
						</Link>
					</nav>

					<div className='hidden items-center gap-4 lg:flex'>
						<Link
							href='/'
							className='rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-600'
							onClick={async () => {
								await supabaseClient.auth.signOut();
							}}
						>
							Log out
						</Link>
						<Link href='/login'>
							<span className='rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white'>
								Account
							</span>
						</Link>
					</div>
				</div>
			) : (
				<div className='mx-auto flex h-16 max-w-screen items-center justify-between px-4 bg-blue-light'>
					<div className='flex items-center gap-4 text-white'>Kollect Club</div>

					<div className='flex w-0 flex-1 justify-end lg:hidden'>
						<button
							className='rounded-full bg-gray-100 p-2 text-gray-500'
							type='button'
						>
							<span className='sr-only'>Menu</span>
							<svg
								className='h-5 w-5'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									clipRule='evenodd'
									d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
									fillRule='evenodd'
								></path>
							</svg>
						</button>
					</div>
					<div className='hidden items-center gap-4 lg:flex'>
						<Link href='/signup'>
							<span className='rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white'>
								Sign up
							</span>
						</Link>
					</div>
				</div>
			)}

			{session?.user && (
				<div className='border-t border-gray-100 lg:hidden'>
					<nav aria-label='Main Nav' className='flex flex-col space-y-1'>
						<Link
							href='/'
							className='flex items-center px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='w-5 h-5 opacity-75'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth='2'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
								/>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
								/>
							</svg>

							<span className='ml-3 text-sm font-medium'> Home </span>
						</Link>
						<Link
							href=''
							className='flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='w-5 h-5 opacity-75'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth='2'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
								/>
							</svg>

							<span className='ml-3 text-sm font-medium'> About </span>
						</Link>
						<Link
							href='/'
							className='flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='w-5 h-5 opacity-75'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth='2'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
								/>
							</svg>

							<span className='ml-3 text-sm font-medium'> Blog </span>
						</Link>
						<details className='group [&_summary::-webkit-details-marker]:hidden'>
							<summary className='flex items-center px-4 py-2 text-gray-500 rounded-lg group hover:bg-gray-100 hover:text-gray-700'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-5 h-5 opacity-75'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									strokeWidth='2'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
									/>
								</svg>

								<span className='ml-3 text-sm font-medium'> Collectibles </span>

								<span className='ml-auto transition duration-300 shrink-0 group-open:-rotate-180'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='w-5 h-5'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path
											fill-rule='evenodd'
											d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
											clip-rule='evenodd'
										/>
									</svg>
								</span>
							</summary>

							<nav
								aria-label='Users Nav'
								className='flex flex-col mt-2 ml-8 space-y-1'
							>
								<Link
									href='/add_item'
									className='block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'
								>
									Add
								</Link>

								<Link
									href='/my_collection'
									className='block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'
								>
									View
								</Link>
							</nav>
						</details>

						<details className='group [&_summary::-webkit-details-marker]:hidden'>
							<summary className='flex items-center px-4 py-2 text-gray-500 rounded-lg group hover:bg-gray-100 hover:text-gray-700'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-5 h-5 opacity-75'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									strokeWidth='2'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
									/>
								</svg>

								<span className='ml-3 text-sm font-medium'> Account </span>

								<span className='ml-auto transition duration-300 shrink-0 group-open:-rotate-180'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='w-5 h-5'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path
											fill-rule='evenodd'
											d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
											clip-rule='evenodd'
										/>
									</svg>
								</span>
							</summary>

							<nav
								aria-label='Account Nav'
								className='flex flex-col mt-2 ml-8 space-y-1'
							>
								<a
									href=''
									className='block px-4 py-4 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'
								>
									Details
								</a>

								<Link
									href='/update_account'
									className='block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'
								>
									Update
								</Link>

								<form action='/logout'>
									<button
										type='submit'
										className='w-full px-4 py-2 mb-2 text-sm font-medium text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700'
									>
										Logout
									</button>
								</form>
							</nav>
						</details>
					</nav>
				</div>
			)}
		</div>
	);
};

export default Navbar;
