/* eslint-disable @next/next/no-img-element */
import { Session, useSupabaseClient, useUser, User } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type Database = any;
type Profiles = Database['public']['Tables']['profiles']['Row'];

const Navbar = ({ session }: { session: Session | null }) => {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(null);

  useEffect(() => {
		if (user) downloadImage(user);
	}, [user]);

	async function downloadImage(supaUser: User) {
		try {

			let { data, error, status } = await supabase
				.from('profiles')
				.select(`avatar_url`)
				.eq('id', supaUser?.id)
				.single();

      if(data) {
        const avatarsReturn = await supabase.storage
          .from('avatars')
          .download(data.avatar_url);
        if (error) {
          throw error;
        }
        if(avatarsReturn?.data) {
          const url = URL.createObjectURL(avatarsReturn.data);
          setAvatarUrl(url);
        }
      }
		} catch (error) {
			console.log('Error downloading image: ', error);
		}
	}

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link href="/" className="flex ml-2 md:mr-24">
              {/* <img
								src='https://drive.google.com/uc?id=103bCnhP8bHe_B66bW2gypW83QqL1MAKu'
								alt='Kollect Club Logo'
								className='h-72'
							/> */}
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Kollect Club
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ml-3">
              <div>
                {session && (
                  <Link
                    className="flex text-sm"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                    href="/updateAccount"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img alt="User Avatar" src={avatarUrl} className="w-8 h-8 rounded-full"/>
                  </Link>
                )}
              </div>
              <div
                className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                id="dropdown-user"
              >
                <div className="px-4 py-3" role="none">
                  <p
                    className="text-sm text-gray-900 dark:text-white"
                    role="none"
                  >
                    Neil Sims
                  </p>
                  <p
                    className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                    role="none"
                  >
                    neil.sims@flowbite.com
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
