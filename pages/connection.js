import React, { useState, useContext } from 'react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useRouter } from 'next/router';
import Account from '../components/Account';
import Layout from '../components/Layout.js';

const Connection = () => {
	const router = useRouter();
	const { user, supabase } = useContext(UserContext);

	if (user) router.push('/');

	return (
		<Layout>
			<div className='py-4 lg:py-16 px-20 mx-auto max-w-screen-md'>
				{user ? (
					<Auth
						supabaseClient={supabase}
						appearance={{ theme: ThemeSupa }}
						theme='dark'
						providers={['github', 'google', 'twitter']}
					/>
				) : (
					<Account />
				)}
			</div>
		</Layout>
	);
};

export default Connection;
