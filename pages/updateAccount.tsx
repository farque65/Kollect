import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Account from '../components/Account';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Home = () => {
	const session = useSession();
	const supabase = useSupabaseClient();

	return (
		<div>
			<Navbar session={session} />
			<Sidebar session={session} />
			<div className='container mt-20'>
				<h1 className='text-center text-2xl font-bold text-white sm:text-3xl md:text-5xl'>
					Update Account
				</h1>
				{session && <Account session={session} />}
			</div>
		</div>
	);
};

export default Home;
