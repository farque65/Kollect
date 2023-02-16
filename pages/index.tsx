import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import {
	useSession,
	useSupabaseClient,
	useUser,
} from '@supabase/auth-helpers-react';
import React, { useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import About from '../components/About';

import { UserContext } from '../context/UserContext';

const Home = () => {
	const session = useSession();
	const supabase = useSupabaseClient();
	const supabaseUser = useUser();
	const { user } = useContext(UserContext);

	// useEffect(() => {
	// 	if (supabaseUser?.id !== null) {
	// 		user;
	// 	}
	// }, [supabaseUser]);

	return (
		<>
			<Navbar session={session} />

			{session ? (
				<>
					<Sidebar session={session} />
					<div className='p-4 sm:ml-64'>
						<div className='p-4 rounded-lg mt-14'>
							<div className='flex items-center justify-center py-20 mb-4 rounded bg-gray-dark'>
								<div className='mx-auto max-w-3xl text-center'>
									<h1 className='bg-gradient-to-r from-purple-300 via-purple-600 to-purple-800 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl'>
										Kollect Club
										<span className='sm:block'>Collection Manager</span>
									</h1>

									<p className='mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed'>
										We enable you to manage and monitor you collectibles
									</p>

									<div className='mt-8 flex flex-wrap justify-center gap-4'>
										<a
											className='block w-full rounded border border-purple-600 bg-purple-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto'
											href='/get-started'
										>
											Get Started
										</a>

										<a
											className='block w-full rounded border border-purple-600 px-12 py-3 text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto'
											href='/about'
										>
											Learn More
										</a>
									</div>
								</div>
							</div>
							<div className='grid grid-cols-2 gap-4 mb-4'>
								<div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
									<p className='text-2xl text-gray-400 dark:text-gray-500'>+</p>
								</div>
								<div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
									<p className='text-2xl text-gray-400 dark:text-gray-500'>+</p>
								</div>
								<div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
									<p className='text-2xl text-gray-400 dark:text-gray-500'>+</p>
								</div>
								<div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
									<p className='text-2xl text-gray-400 dark:text-gray-500'>+</p>
								</div>
							</div>
							<div className='flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800'>
								<p className='text-2xl text-gray-400 dark:text-gray-500'>+</p>
							</div>
							<div className='grid grid-cols-3 gap-4 mb-4'>
								<div className='flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800'>
									<p className='text-2xl text-gray-400 dark:text-gray-500'>+</p>
								</div>
								<div className='flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800'>
									<p className='text-2xl text-gray-400 dark:text-gray-500'>+</p>
								</div>
								<div className='flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800'>
									<p className='text-2xl text-gray-400 dark:text-gray-500'>+</p>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<CallToAction />
					<About />
					<div className='container py-20' id='signin'>
						<Auth
							providers={['facebook', 'google']}
							supabaseClient={supabase}
							appearance={{
								theme: ThemeSupa,
								variables: {
									default: {
										colors: {
											brand: '#283362',
											brandAccent: '#283362',
											defaultButtonBorder: '#283362',
										},
									},
								},
							}}
							theme='dark'
							socialLayout='horizontal'
						/>
					</div>
					<Footer />
				</>
			)}
		</>
	);
};

export default Home;
