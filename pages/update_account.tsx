import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Account from '../components/Account';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
	const session = useSession();
	const supabase = useSupabaseClient();

	return (
		<div>
			<Navbar session={session} />
			<div className='container' style={{ padding: '50px 0 100px 0' }}>
				<h1 className='text-center text-2xl font-bold text-white sm:text-3xl md:text-5xl'>
					Update Account
				</h1>
				{session && <Account session={session} />}
			</div>
			<Footer />
		</div>
	);
};

export default Home;
