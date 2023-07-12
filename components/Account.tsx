import {
	Session, useSupabaseClient, useUser
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Avatar from './Avatar';

type Database = any;
type Profiles = Database['public']['Tables']['profiles']['Row'];

export default function Account({ session }: { session: Session }) {
	const supabase = useSupabaseClient<Database>();
	const user = useUser();
	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState<Profiles['username']>(null);
	const [website, setWebsite] = useState<Profiles['website']>(null);
	const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null);
	const router = useRouter();

	useEffect(() => {
		getProfile();
	}, [session]);

	async function getProfile() {
		try {
			setLoading(true);
			if (!user) throw new Error('No user');

			let { data, error, status } = await supabase
				.from('profiles')
				.select(`username, website, avatar_url`)
				.eq('id', user.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setUsername(data.username);
				setWebsite(data.website);
				setAvatarUrl(data.avatar_url);
			}
		} catch (error) {
			alert('Error loading user data!');
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	async function updateProfile({
		username,
		website,
		avatar_url,
	}: {
		username: Profiles['username'];
		website: Profiles['website'];
		avatar_url: Profiles['avatar_url'];
	}) {
		try {
			setLoading(true);
			if (!user) throw new Error('No user');

			const updates = {
				id: user.id,
				username,
				website,
				avatar_url,
				updated_at: new Date().toISOString(),
			};

			let { error } = await supabase.from('profiles').upsert(updates);
			if (error) throw error;
			alert('Profile updated!');
		} catch (error) {
			alert('Error updating the data!');
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div>
			{user && (
				<Avatar
					uid={user.id}
					url={avatar_url}
					size={150}
					onUpload={(url) => {
						setAvatarUrl(url);
						updateProfile({ username, website, avatar_url: url });
					}}
				/>
			)}
			<div>
				<label htmlFor='email' className='text-white'>Email</label>
				<input id='email' type='text' value={session.user.email} disabled />
			</div>
			<div>
				<label htmlFor='username' className='text-white'>Username</label>
				<input
					id='username'
					type='text'
					value={username || ''}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor='website' className='text-white'>Website</label>
				<input
					id='website'
					type='website'
					value={website || ''}
					onChange={(e) => setWebsite(e.target.value)}
				/>
			</div>

			<div>
				<button
					className='button block w-full my-4'
					onClick={() => updateProfile({ username, website, avatar_url })}
					disabled={loading}
				>
					{loading ? 'Loading ...' : 'Update'}
				</button>
			</div>

			<div>
				<button
					className='button block w-full'
					onClick={async() => {
						await supabase.auth.signOut()
						router.push("/")
					}}
				>
					Sign Out
				</button>
			</div>
		</div>
	);
}
