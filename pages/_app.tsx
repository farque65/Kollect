import { useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { UserContextProvider } from "../context/UserContext";

function MyApp({
	Component,
	pageProps,
}: AppProps<{
	initialSession: Session;
}>) {
	const [supabase] = useState(() => createBrowserSupabaseClient());

	return (
		<UserContextProvider>
			<SessionContextProvider
				supabaseClient={supabase}
				initialSession={pageProps.initialSession}
			>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
			</SessionContextProvider>
		</UserContextProvider>
	);
}
export default MyApp;
