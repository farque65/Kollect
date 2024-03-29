import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Account from '../components/Account';
import Sidebar from '../components/Sidebar';

const Home = () => {
	const session = useSession();
	const supabase = useSupabaseClient();

	return (
		<div>
			<Sidebar session={session} />
			<div className='container mt-10 mb-40'>
				<h1 className='text-center text-4xl text-white mb-10'>
					Account Info
				</h1>
				{session && <Account session={session} />}
			</div>
		</div>
	);
};

export default Home;
