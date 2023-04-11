import { Session, useSupabaseClient } from '@supabase/auth-helpers-react';
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
  collectible_image_url
}: {
  session: Session;
  year_manufactured: any;
  category: any;
  grade_company: any;
  description: any;
  title: any;
  collectible_image_url: any;
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
    <a
      href="#"
      className="block rounded-lg p-4 shadow-sm shadow-indigo-100 bg-gray-100 m-4"
    >
      {collectible_image_url ? 
        <img
        alt="Collectible Image Url"
        src={avatarUrl}
        className="h-40 w-full rounded-md object-cover"
      />
      :
        <img
        alt="Home"
        src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        className="h-40 w-full rounded-md object-cover"
      />}
      

      <div className="mt-2">
        <div className="mt-6 flex flex-wrap items-center gap-8 text-xs">
        <div className="sm:inline-flex sm:shrink-0 sm:items-center">

            <div className="mt-1.5 sm:ml-3 sm:mt-0">
              <p className="text-gray-500">Title</p>

              <p className="font-medium">{title}</p>
            </div>
          </div>
          <div className="sm:inline-flex sm:shrink-0 sm:items-center">
            <svg
              className="h-4 w-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
              />
            </svg>

            <div className="mt-1.5 sm:ml-3 sm:mt-0">
              <p className="text-gray-500">Category</p>

              <p className="font-medium">{category}</p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center">
            <svg
              className="h-4 w-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>

            <div className="mt-1.5 sm:ml-3 sm:mt-0">
              <p className="text-gray-500">Year</p>

              <p className="font-medium">{year_manufactured}</p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center">
            <svg
              className="h-4 w-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>

            <div className="mt-1.5 sm:ml-3 sm:mt-0">
              <p className="text-gray-500">Grade</p>

              <p className="font-medium">{grade_company}</p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Card;
