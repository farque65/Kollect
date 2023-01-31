import { useState, useEffect } from 'react';
import {
	useUser,
	useSupabaseClient,
	Session,
} from '@supabase/auth-helpers-react';
import ItemPictureAdd from './ItemPictureAdd';
type Database = any;
type Collectibles = Database['public']['Tables']['collectibes']['Row'];

export default function Account({ session }: { session: Session }) {
	const supabase = useSupabaseClient<Database>();
	const user = useUser();
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState<Collectibles['title']>(null);
	const [description, setDescription] =
		useState<Collectibles['description']>(null);
	const [category, setCategory] = useState<Collectibles['category']>(null);
	const [collectibleImageUrl, setCollectibleImageUrl] =
		useState<Collectibles['collectible_image_url']>(null);

	async function updateCollectible({
		title,
		description,
		category,
	}: {
		title: Collectibles['title'];
		description: Collectibles['description'];
		category: Collectibles['category'];
	}) {
		try {
			setLoading(true);
			if (!user) throw new Error('No user');

			const updates = {
				title,
				description,
				category,
				user_id: session.user.id,
			};
			console.log('update object ', updates);
			let { error } = await supabase
				//TODO - update collectibles table in supabase postgres
				.from('collectibles_duplicate')
				.insert(updates);
			if (error) throw error;
			alert('Collectible updated!');
		} catch (error) {
			alert('Error updating the data!');
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className='form-widget'>
			{user && (
				<ItemPictureAdd
					uid={user.id}
					url={collectibleImageUrl}
					size={150}
					onUpload={(url) => {
						setCollectibleImageUrl(url);
					}}
				/>
			)}
			<div>
				<label htmlFor='title'>Title</label>
				<input
					id='title'
					type='text'
					value={title || ''}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor='description'>Description</label>
				<input
					id='description'
					type='description'
					value={description || ''}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor='category'>Category</label>
				<input
					id='category'
					type='category'
					value={category || ''}
					onChange={(e) => setCategory(e.target.value)}
				/>
			</div>
			<br />
			<div>
				<button
					className='button primary block w-full'
					onClick={() => updateCollectible({ title, description, category })}
					disabled={loading}
				>
					{loading ? 'Loading ...' : 'Add Item'}
				</button>
			</div>
		</div>
	);
}
