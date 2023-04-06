import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import React, { useMemo, useEffect } from 'react';

export interface UserContextState {
	user: null,
	setUser: Dispatch<SetStateAction<any>>,
	userid: null,
	setUserid: Dispatch<SetStateAction<any>>,
}

const startingState: UserContextState = {
	user: null,
	setUser: () => {},
	userid: null,
	setUserid: () => {},
};

// create our app context
export const UserContext = createContext(startingState);

export function UserContextProvider({ children }: { children: any }) {
	const supabaseClient = useSupabaseClient();
	const [user, setUser] = useState<any>({});
	const [userid, setUserid] = useState<any>("");

	useEffect(() => {
		const items = localStorage.getItem('kollectclubid');
		if(!items) {
			setUserid(userid);
		} 
		
		if(userid.length > 0){
			localStorage.setItem('kollectclubid', userid);
		}
	  }, [userid]);

	const stateMemo = useMemo(
		() => ({
			user,
			setUser,
			userid,
			setUserid,
		}),
		[user, userid]
	);

	const providerProps = {
		user,
		setUser,
		userid,
		setUserid,
	};

	return (
		<UserContext.Provider value={providerProps}>
			{children}
		</UserContext.Provider>
	);
}
