/* eslint-disable @next/next/no-img-element */
import { Session, User, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Database = any;
type Profiles = Database['public']['Tables']['profiles']['Row'];

const Sidebar = ({ session }: { session: Session | null }) => {
	const supabase = useSupabaseClient<Database>();
	const user = useUser();
	const router = useRouter();
	const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(null);
	const [username, setUsername] = useState<Profiles['username']>(null);
  
	useEffect(() => {
		  if (user) downloadImage(user);
	  }, [user]);
  
	  async function downloadImage(supaUser: User) {
		  try {
  
			  let { data, error, status } = await supabase
				  .from('profiles')
				  .select(`avatar_url,username`)
				  .eq('id', supaUser?.id)
				  .single();
  
		if(data) {
		  const avatarsReturn = await supabase.storage
			.from('avatars')
			.download(data.avatar_url);
			setUsername(data.username);
		  if (error) {
			throw error;
		  }
		  if(avatarsReturn?.data) {
			const url = URL.createObjectURL(avatarsReturn.data);
			setAvatarUrl(url);
		  }
		}
		  } catch (error) {
			  console.log('Error downloading image: ', error);
		  }
	  }

	return (
		<div>
		<aside
			id='logo-sidebar'
			className='fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700'
			aria-label='Sidebar'
		>
			<div className='h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800'>
				<div>
					<div className='p-4'>
						<Link
							className="text-xl font-semibold sm:text-2xl text-white"
							href="/"
							>
							Kollect Club
						</Link>
					</div>
					  {(session||user?.id) && (
						<Link
						  className="flex rounded-md p-2 bg-gray-800 hover:bg-gray-700"
						  aria-expanded="false"
						  data-dropdown-toggle="dropdown-user"
						  href="/updateAccount"
						>
						  {avatarUrl ?
							<div className="flex flex-row">
								<img alt="User Avatar" src={avatarUrl} className="w-10 h-10 rounded-full"/>
								<span className='text-white p-2'>{username}</span>
							</div>
							:
							<div className="flex flex-row w-10 h-10 rounded-full items-center justify-center bg-gray-200 text-gray-400">
							  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24">
								<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
								<circle cx="12" cy="7" r="4"></circle>
							  </svg>
							</div>
						  }
						</Link>
					  )}
				</div>
				<ul className='space-y-2 mt-4'>
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
								await supabase.auth.signOut();
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
								className='flex items-center p-2 text-base font-normal rounded-lg'
							>
								<svg
									aria-hidden='true'
									className='w-6 h-6 transition duration-75 text-white hover:text-purple-darkpurple'
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
									className='flex-shrink-0 w-6 h-6 transition duration-75 text-white'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'></path>
								</svg>
							</Link>
						</div>
						<div>
							<Link
								href='/updateAccount'
								className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
							>
								<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-Width="2" className="w-6 h-6" viewBox="0 0 24 24">
								<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
								<circle cx="12" cy="7" r="4"></circle>
								</svg>
							</Link>
						</div>
						<div>
							<Link
								href='/'
								className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
								onClick={async () => {
									await supabase.auth.signOut();
								}}
							>
							<svg
								aria-hidden='true'
								className='flex-shrink-0 w-6 h-6 text-white transition duration-75'
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
							</Link>
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
};

export default Sidebar;
