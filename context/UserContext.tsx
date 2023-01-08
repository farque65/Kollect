import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

export interface UserContextState {
	user: any;
	logout: () => void;
	supabase: any;
	loading: any;
}

const startingState: UserContextState = {
	user: null,
	logout: () => {},
	supabase: null,
	loading: null,
};

// create our app context
export const UserContext = createContext(startingState);

export function UserContextProvider({ children }: { children: any }) {
	const supabaseClient = useSupabaseClient();
	const supabaseUser = useUser();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (supabaseUser) {
			setLoading(false);
		}
	}, [supabaseUser]);

	const providerProps = {
		user: supabaseUser,
		logout: async function () {
			await supabaseClient.auth.signOut();
		},
		supabase: supabaseClient,
		loading: loading,
	};

	return (
		<UserContext.Provider value={providerProps}>
			{children}
		</UserContext.Provider>
	);
}
