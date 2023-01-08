import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import ItemList from '../components/ItemList';
import Navbar from '../components/Navbar';
import React, { useEffect, useState, useContext } from 'react';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Home = () => {
	const session = useSession();
	const supabase = useSupabaseClient();
	const [collectibles, setCollectibles] = useState<any>(null);
	const [fetchError, setFetchError] = useState('');

	useEffect(() => {
		const fetchCollectibles = async () => {
			const { data, error } = await supabase.from('collectibles').select();

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
				{!session ? (
					<div className='container' style={{ padding: '50px 0 100px 0' }}>
						<Auth
							providers={['facebook', 'google']}
							supabaseClient={supabase}
							appearance={{ theme: ThemeSupa }}
							theme='dark'
						/>
					</div>
				) : (
					<>
						<CallToAction />
						<ItemList session={session} collectibles={collectibles} />
						<Footer />
					</>
				)}
			</div>
		</div>
	);
};

export default Home;
