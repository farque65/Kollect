/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
// _app.js

import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SideNavbar from '../components/SideNavbar';
import '../styles/globals.css';
import { supabase } from '../utils/supabase';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { UserContextProvider } from '../context/UserContext';

function MyApp({ Component, pageProps }) {
	const [session, setSession] = useState(null);
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());

	useEffect(() => {
		setSession(supabase.auth.getSession());
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
		///////// TODO: Remove after auth is configure
		if (!session) {
			setSession({ user: {} });
			// setSession({ user: 1 });
		}
	}, []);
	return (
		<SessionContextProvider
			supabaseClient={supabaseClient}
			initialSession={pageProps.initialSession}
		>
			<UserContextProvider>
				<ChakraProvider>
					{/* <div className='flex flex-wrap'>
						<div className='flex flex-wrap w-1/6 justify-center items-center'>
							<SideNavbar session={session} />
						</div>
						<div className='flex flex-wrap w-5/6 pl-16'>
							<Component {...pageProps} session={session} />
						</div>
					</div> */}
					<Navbar session={session} />
					<Component {...pageProps} session={session} />
					{/* <Footer /> */}
				</ChakraProvider>
			</UserContextProvider>
		</SessionContextProvider>
	);
}
export default MyApp;
