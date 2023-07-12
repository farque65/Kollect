import {
	Session, useSupabaseClient, useUser
} from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CallToAction from './CallToAction';
type Database = any;

export default function DashboardPanels({ session }: { session: Session | null }) {
	const supabase = useSupabaseClient<Database>();
	const supabaseUser = useUser();
	const [loading, setLoading] = useState(true);
	const [collectibles, setCollectibles] = useState<any>(null);
	const [fetchError, setFetchError] = useState('');
	const [filterCategories, setFilterCategories] = useState(['all']);
	const [category, setCategory] = useState('all');

	const fetchCollectibles = async () => {
			const item = localStorage.getItem('kollectclubid') || supabaseUser?.id;

			const { data, error } = await supabase
				.from('collectibles_duplicate')
				.select()
				.match({user_id: item});

			if (error) {
				setFetchError('could not fetch collectibles');
				setCollectibles(null);
				console.log(error);
			}

			if (data) {
				let tempData = [];
				if (category === 'all') {
					tempData = data;
				} else {
					data.map((item)=> {
						if(item.category && item.category.toString().toLowerCase() === category) {
							tempData.push(item);
						}
					});
				}
				setCollectibles(tempData);
				setFetchError('');
				let tempCategories = ['all'];
				data.map((item)=>{
					if(!tempCategories.includes(item.category) && item.category !== null) {
						tempCategories.push(item.category);
					}
				});
				setFilterCategories(tempCategories);
			}
		};

	useEffect(() => {
		fetchCollectibles();
	}, [category]);

	return (		
		<div className='p-4 sm:ml-64 md:mb-2 mb-10'>
			<div className='rounded-lg mt-4'>
				<CallToAction session={session} />
				<div className='flex items-center justify-center px-2 py-10 mt-4 mb-10 rounded bg-gray-800'>
					<div className="overflow-x-auto">
						<h1 className='text-center text-white text-4xl mb-10 font-bold'>Quick Item View</h1>
						{/* Category lists */}
						<div className='w-full overflow-y-auto flex sm:flex-row flex-wrap'>
							{
								filterCategories.map((item: any, i: any)=>(
								<button className='mr-2 py-2 px-4 bg-gray-700 hover:bg-gray-500' onClick={()=>{
									setCategory(item.toString().toLowerCase());
								}}>
									{item}
								</button>
								))
							}
						</div>
						<table
							className="min-w-full divide-y-2 divide-gray-200 text-sm dark:divide-gray-700"
						>
							<thead>
							<tr>
								<th
								className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white"
								>
								Title
								</th>
								<th
								className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white"
								>
								Description
								</th>
								<th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
								Category
								</th>
								<th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
								Link
								</th>
							</tr>
							</thead>

							<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
							{collectibles &&
								collectibles.map(
								(
									item: { title: any; category: any; year_manufactured: any; grade_level: any; description: any; id: any  },
									i: any
								) => (
									<tr key={`${item.year_manufactured}-${i}`}>
										<td
										className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
										>
										{item.title}
										</td>
										<td
										className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
										>
										{item.description}
										</td>
										<td
										className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
										>
										{item.category}
										</td>
										<td className="whitespace-nowrap px-4 py-2">
										<Link
											href={{
												pathname: '/item/'+item.id.toString(),
												query: supabaseUser?.id
											}}
											className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
										>
											View
										</Link>
										</td>
									</tr>
								)
							)}
							</tbody>
						</table>
						{!collectibles && <>No Items Found</>}
					</div>
				</div>
			</div>
		</div>
	);
}
