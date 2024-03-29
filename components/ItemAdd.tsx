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
	const [gradeCompany, setGradeCompany] =
		useState<Collectibles['grade_company']>(null);
	const [gradingLevel, setGradingLevel] =
		useState<Collectibles['gradingLevel']>(null);
	const [collectibleImageUrl, setCollectibleImageUrl] =
		useState<Collectibles['collectible_image_url']>(null);

	async function updateCollectible({
		title,
		description,
		category,
		gradeCompany,
		gradingLevel,
		collectibleImageUrl
	}: {
		title: Collectibles['title'];
		description: Collectibles['description'];
		category: Collectibles['category'];
		gradeCompany: Collectibles['grade_company'];
		gradingLevel: Collectibles['grade_level'];
		collectibleImageUrl: Collectibles['collectible_image_url'];
	}) {
		try {
			setLoading(true);
			if (!user) throw new Error('No user');

			const updates = {
				title,
				description,
				category,
				grade_company: gradeCompany,
				grade_level: gradingLevel,
				user_id: session.user.id,
				collectible_image_url: collectibleImageUrl
			};
			console.log('update object ', updates);
			let { error } = await supabase
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
		<div className='px-10 py-4 mt-4 overflow-y-auto bg-gray-600'>
			{user && (
				<ItemPictureAdd
					url={collectibleImageUrl}
					size={150}
					onUpload={(url) => {
						setCollectibleImageUrl(url);
					}}
				/>
			)}
			<div>
				<label htmlFor='title' className='text-white'>Title</label>
				<input
					id='title'
					type='text'
					value={title || ''}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor='description' className='text-white'>Description</label>
				<input
					id='description'
					type='description'
					value={description || ''}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor='category' className='text-white'>Category</label>
				<input
					id='category'
					type='category'
					value={category || ''}
					onChange={(e) => setCategory(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor='gradeCompany' className='text-white'>Grade Company</label>
				<input
					id='gradeCompany'
					type='gradeCompany'
					value={gradeCompany || ''}
					onChange={(e) => setGradeCompany(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor='gradingLevel' className='text-white'>Grade Level</label>
				<input
					id='gradeLevel'
					type='gradeLevel'
					value={gradingLevel || ''}
					onChange={(e) => setGradingLevel(e.target.value)}
				/>
			</div>
			<br />
			<button
				className='button bg-gray-800 block w-full'
				onClick={() =>
					updateCollectible({
						title,
						description,
						category,
						gradeCompany,
						gradingLevel,
						collectibleImageUrl
					})
				}
				disabled={loading}
			>
				{loading ? 'Loading ...' : 'Add Item'}
			</button>
		</div>
	);
}
