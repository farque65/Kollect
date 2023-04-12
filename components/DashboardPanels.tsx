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

	useEffect(() => {
		const fetchCollectibles = async () => {
			const item = localStorage.getItem('kollectclubid') || supabaseUser?.id;

			const { data, error } = await supabase
				.from('collectibles_duplicate')
				.select()
				.eq('user_id', item);

			if (error) {
				setFetchError('could not fetch collectibles');
				setCollectibles(null);
				console.log(error);
			}
			if (data) {
				setCollectibles(data);
				setFetchError('');
			}
		};
		fetchCollectibles();
	}, []);

	return (		
		<div className='p-4 sm:ml-64 mb-10'>
			<div className='rounded-lg mt-16'>
				<CallToAction session={session} />
				<div className='flex items-center justify-center p-2 mt-4 mb-4 rounded bg-gray-50 dark:bg-gray-800'>
					<div className="overflow-x-auto">
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
								<th
								className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white"
								>
								Year Manufactured
								</th>
								<th
								className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white"
								>
								Grade Level
								</th>
								<th className="px-4 py-2"></th>
							</tr>
							</thead>

							<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
							{collectibles &&
								collectibles.slice(0,5).map(
								(
									item: { title: any; category: any; year_manufactured: any; grade_level: any; description: any  },
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
										<td
										className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
										>
										{item.year_manufactured}
										</td>
										<td
										className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
										>
										{item.grade_level}
										</td>
										<td className="whitespace-nowrap px-4 py-2">
										<a
											href="#"
											className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
										>
											View
										</a>
										</td>
									</tr>
								)
							)}
							</tbody>
						</table>
						{!collectibles && <>No Items Found</>}
					</div>
				</div>
				<div className='flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800'>
									{/* 
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

									 */}
				</div>
				<div className='grid grid-cols-3 gap-4 mb-4'>
					<div className='flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800'>
						<p className='text-2xl text-gray-400 dark:text-gray-500'>+</p>
					</div>
					<div className='flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800'>
						<p className='text-2xl text-gray-400 dark:text-gray-500'>+</p>
					</div>
					<div className='flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800'>
						<p className='text-2xl text-gray-400 dark:text-gray-500'>+</p>
					</div>
				</div>
			</div>
		</div>
	);
}
