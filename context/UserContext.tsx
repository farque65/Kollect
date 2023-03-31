import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useSupabaseClient, useUser, User } from '@supabase/auth-helpers-react';

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
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(true);

	const providerProps = {
		user,
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
