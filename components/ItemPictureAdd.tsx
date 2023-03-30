import { useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { useEffect, useState } from 'react';
import { v4 } from "uuid";
type Database = any;
type Collectible = Database['public']['Tables']['collectible_duplicate']['Row'];

export default function ItemPictureAdd({
	url,
	size,
	onUpload,
}: {
	url: Collectible['collectible_image_url'];
	size: number;
	onUpload: (url: string) => void;
}) {
	const supabase = useSupabaseClient<Database>();
	const [avatarUrl, setAvatarUrl] =
		useState<Collectible['collectible_image_url']>(null);
	const [uploading, setUploading] = useState(false);

	useEffect(() => {
		if (url) downloadImage(url);
	}, [url]);

	async function downloadImage(path: string) {
		try {
			const { data, error } = await supabase.storage
				.from('collectible_duplicate_image')
				.download(path);
			if (error) {
				throw error;
			}
			const url = URL.createObjectURL(data);
			setAvatarUrl(url);
		} catch (error) {
			console.log('Error downloading image: ', error);
		}
	}

	const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
		event
	) => {
		try {
			setUploading(true);

			if (!event.target.files || event.target.files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const uid = v4();

			const file = event.target.files[0];
			const fileExt = file.name.split('.').pop();
			const fileName = `${uid.toString()}.${fileExt}`;
			const filePath = `${fileName}`;

			let { error: uploadError } = await supabase.storage
				.from('collectible_duplicate_image')
				.upload(filePath, file, { upsert: true });

			if (uploadError) {
				throw uploadError;
			}

			onUpload(filePath);
		} catch (error) {
			alert('Error uploading image url!');
			console.log(error);
		} finally {
			setUploading(false);
		}
	};

	return (
		<div>
			{avatarUrl ? (
				<img
					src={avatarUrl}
					alt='Avatar'
					className='avatar image'
					style={{ height: size, width: size }}
				/>
			) : (
				<div
					className='avatar no-image'
					style={{ height: size, width: size }}
				/>
			)}
			<div style={{ width: size }}>
				<label className='button primary block' htmlFor='single'>
					{uploading ? 'Uploading ...' : 'Upload'}
				</label>
				<input
					style={{
						visibility: 'hidden',
					}}
					type='file'
					id='single'
					accept='image/*'
					onChange={uploadAvatar}
					disabled={uploading}
				/>
			</div>
		</div>
	);
}
