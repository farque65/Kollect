import React, { createContext, useState, useEffect } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

const UserContext = createContext({});

export default UserContext;

export function UserContextProvider({ children }) {
	const supabaseClient = useSupabaseClient();
	const supabaseUser = useUser();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (supabaseUser) {
			setLoading(false);
		}
	}, [supabaseUser]);

	return (
		<UserContext.Provider
			value={{
				user: supabaseUser,
				logout: async function () {
					await supabaseClient.auth.signOut();
				},
				supabase: supabaseClient,
				loading: loading,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
