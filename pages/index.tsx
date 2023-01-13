import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Navbar from '../components/Navbar';
import React, { useEffect, useState, useContext } from 'react';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Home = () => {
	const session = useSession();
	const supabase = useSupabaseClient();

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
						<Footer />
					</>
				)}
			</div>
		</div>
	);
};

export default Home;
