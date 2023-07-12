import { Session, useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
type Database = any;
type Collectible = Database['public']['Tables']['collectibles_duplicate']['Row'];

const Card = ({
  session,
  year_manufactured,
  category,
  grade_company,
  description,
  title,
  collectible_image_url,
  id
}: {
  session: Session;
  year_manufactured: any;
  category: any;
  grade_company: any;
  description: any;
  title: any;
  collectible_image_url: any;
  id: any;
}) => {
  const supabase = useSupabaseClient<Database>();
  const [avatarUrl, setAvatarUrl] = useState<Collectible['collectible_image_url']>(null);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');

	useEffect(() => {
		if (collectible_image_url) downloadImage(collectible_image_url);
	}, [collectible_image_url]);

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

  return (
    <Link
      href={'/item/'+id}
      className="block lg:w-40 w-full rounded-lg p-4 shadow-sm shadow-indigo-100 bg-gray-100 mr-4 my-2"
    >
      {collectible_image_url ? 
        <img
        alt="Collectible Image Url"
        src={avatarUrl}
        className="h-40 lg:w-40 w-full rounded-md object-cover"
      />
      :
        <img
        alt="Home"
        src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        className="h-40 lg:w-40 w-full rounded-md object-cover"
      />}
      

      <div className="mt-2">
        <div className="mt-6 flex flex-wrap items-center gap-8 text-xs">
        <div className="sm:inline-flex sm:shrink-0 sm:items-center">

            <div className="mt-1.5 sm:ml-3 sm:mt-0">
              <p className="text-gray-500">Title</p>

              <p className="font-medium">{title?.length > 10 ? title?.substring(0,10)+"..." : title}</p>
            </div>
          </div>
          <div className="sm:inline-flex sm:shrink-0 sm:items-center">
            <div className="sm:ml-3 mt-0">
              <p className="text-gray-500">Category</p>

              <p className="font-medium">{category?.length > 10 ? category?.substring(0,10)+"..." : category}</p>
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default Card;
