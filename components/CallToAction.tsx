import { Session } from '@supabase/auth-helpers-react';

const CallToAction = ({ session }: { session: Session | null }) => {
	return (
		<div className='flex items-center justify-center py-20 bg-gray-800 rounded-lg'>
			<div className='mx-auto max-w-3xl text-center'>
				<h1 className='text-white text-4xl font-bold'>
					Kollect Club
					<span className='sm:block'>Collection Manager</span>
				</h1>

				<p className='mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed text-white'>
					We enable you to manage and monitor you collectibles
				</p>

				{!session &&
				<div className='mt-8 flex flex-wrap justify-center gap-4'>
					<a
						className='block rounded border border-purple-600 bg-purple-600 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 w-1/2'
						href='#signin'
					>
						Get Started!
					</a>
				</div>
				}


			</div>
		</div>
	);
};

export default CallToAction;
