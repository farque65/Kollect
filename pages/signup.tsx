import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Navbar from '../components/Navbar';
import React, { useEffect, useState, useContext } from 'react';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import About from '../components/About';

const Signup = () => {
	const session = useSession();
	const supabase = useSupabaseClient();

	return (
		<div>
			<Navbar session={session} />
			<div>
				{!session ? (
					<div>
						<div className='container pt-16'>
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

export default Signup;
