import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import {
	useSession,
	useSupabaseClient,
	useUser,
} from '@supabase/auth-helpers-react';
import ItemList from '../components/ItemList';
import Navbar from '../components/Navbar';
import React, { useEffect, useState, useContext } from 'react';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import ItemAdd from '../components/ItemAdd';

const Home = () => {
	const session = useSession();
	const supabase = useSupabaseClient();
	const supabaseUser = useUser();
	const [collectibles, setCollectibles] = useState<any>(null);
	const [fetchError, setFetchError] = useState('');

	useEffect(() => {
		const fetchCollectibles = async () => {
			const { data, error } = await supabase
				.from('collectibles_duplicate')
				.select()
				.eq('user_id', supabaseUser?.id);

			if (error) {
				setFetchError('could not fetch collectibles');
				setCollectibles(null);
				console.log(error);
			}
			if (data) {
				setCollectibles(data);
				setFetchError('');
			}
		};
		fetchCollectibles();
	}, []);

	return (
		<div>
			<Navbar session={session} />
			<div>
				{session && (
					<>
						<Sidebar session={session} />
						<div className='p-4 sm:ml-64'>
							<div className='p-4 rounded-lg mt-14'>
								<div className='flex items-center justify-center py-20 mb-4 rounded bg-gray-dark'>
									<ItemList session={session} collectibles={collectibles} />
								</div>
								<div className='grid grid-cols-2 gap-4 mb-4'>
									<div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
										<p className='text-2xl text-gray-400 dark:text-gray-500'>
											+
										</p>
									</div>
									<div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
										<p className='text-2xl text-gray-400 dark:text-gray-500'>
											+
										</p>
									</div>
									<div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
										<p className='text-2xl text-gray-400 dark:text-gray-500'>
											+
										</p>
									</div>
									<div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
										<p className='text-2xl text-gray-400 dark:text-gray-500'>
											+
										</p>
									</div>
								</div>
								<div className='flex items-center justify-center mb-4 rounded bg-gray-50 dark:bg-gray-800'>
									<div
										className='container'
										style={{ padding: '50px 0 100px 0' }}
									>
										<h1 className='text-center text-2xl font-bold text-white sm:text-3xl md:text-5xl'>
											Add Collectible
										</h1>
										{session && <ItemAdd session={session} />}
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Home;
