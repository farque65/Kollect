// @ts-nocheck
// supabase.js
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

const customTheme = {
	default: {
		colors: {
			brand: 'hsl(153 60.0% 53.0%)',
			brandAccent: 'hsl(154 54.8% 45.1%)',
			brandButtonText: 'white',
			// ..
		},
		dark: {
			colors: {
				brandButtonText: 'white',
				defaultButtonBackground: '#2e2e2e',
				defaultButtonBackgroundHover: '#3e3e3e',
				//..
			},
		},
		// You can also add more theme variations with different names.
		evenDarker: {
			colors: {
				brandButtonText: 'white',
				defaultButtonBackground: '#1e1e1e',
				defaultButtonBackgroundHover: '#2e2e2e',
				//..
			},
		},
	},
};

const App = () => (
	<Auth
		supabaseClient={supabase}
		theme='default' // can also be "dark" or "evenDarker"
		appearance={{ theme: customTheme }}
	/>
);
