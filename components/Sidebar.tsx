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
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
							><path fill="currentColor" d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z"/>
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
								xmlns="http://www.w3.org/2000/svg"
								width="48"
								height="48"
								viewBox="0 0 48 48"
								className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
							>
								<mask id="ipSAdd0"><g fill="none" stroke-linejoin="round" stroke-width="4"><rect width="36" height="36" x="6" y="6" fill="#fff" stroke="#fff" rx="3"/><path stroke="#000" stroke-linecap="round" d="M24 16v16m-8-8h16"/></g></mask><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSAdd0)"/>
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
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
							>
								<path fill="currentColor" d="m17 8l-1.4 1.4l1.6 1.6H9v2h8.2l-1.6 1.6L17 16l4-4l-4-4M5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5V5Z"/>
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
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 16 16"
									className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
								><path fill="currentColor" d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z"/>
								</svg>
							</Link>
						</div>
						<div>
							<Link
								href='/updateAccount'
								className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="48"
									height="48"
									viewBox="0 0 48 48"
									className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
								>
									<mask id="ipSAdd0"><g fill="none" stroke-linejoin="round" stroke-width="4"><rect width="36" height="36" x="6" y="6" fill="#fff" stroke="#fff" rx="3"/><path stroke="#000" stroke-linecap="round" d="M24 16v16m-8-8h16"/></g></mask><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSAdd0)"/>
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
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
								>
									<path fill="currentColor" d="m17 8l-1.4 1.4l1.6 1.6H9v2h8.2l-1.6 1.6L17 16l4-4l-4-4M5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5V5Z"/>
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
