import {
	Session, useSupabaseClient, useUser
} from '@supabase/auth-helpers-react';
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
		<div className='p-4 sm:ml-64 mb-10'>
			<div className='rounded-lg mt-16'>
				<CallToAction session={session} />
				<div className='flex items-center justify-center px-2 py-10 mt-4 mb-4 rounded bg-gray-50 dark:bg-gray-800'>
					<div className="overflow-x-auto">
						<h1 className='text-center text-purple-600 font-bold text-4xl'>Quick Item View</h1>
						{/* Category lists */}
						<div className='w-full overflow-y-auto flex flex-row'>
							{
								filterCategories.map((item: {category: any}, i: any)=>(
								<button className='m-2 py-1 px-2 bg-gray-700' onClick={()=>{
									setCategory(item.toLowerCase());
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
								<th
								className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white"
								>
								Category
								</th>
								<th className="px-4 py-2"></th>
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
										{/*
										<Link
											href="/[page]" as={`/${item.id.toString()}`}
											className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
										>
											View
										</Link>
										*/}
										</td>
									</tr>
								)
							)}
							</tbody>
						</table>
						{!collectibles && <>No Items Found</>}
					</div>
				</div>
				{/* 
				<div className='flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800'>
									
									<article className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6">
									<div className="flex items-center gap-4">
										<span className="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
											/>
										</svg>
										</span>

										<div>
										<p className="text-sm text-gray-500">Profit</p>

										<p className="text-2xl font-medium text-gray-900">$240.94</p>
										</div>
									</div>

									<div className="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
										<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
										/>
										</svg>

										<span className="text-xs font-medium"> 67.81% </span>
									</div>
									</article>

									<article
									className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6 ml-4"
									>
									<div className="flex items-center gap-4">
										<span className="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
											/>
										</svg>
										</span>

										<div>
										<p className="text-sm text-gray-500">Profit</p>

										<p className="text-2xl font-medium text-gray-900">$240.94</p>
										</div>
									</div>

									<div className="inline-flex gap-2 rounded bg-red-100 p-1 text-red-600">
										<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
										/>
										</svg>

										<span className="text-xs font-medium"> 67.81% </span>
									</div>
									</article>

									 
				</div>
				*/}

			</div>
		</div>
	);
}
