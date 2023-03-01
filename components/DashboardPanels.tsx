import {
	Session, useSupabaseClient, useUser
} from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import CallToAction from './CallToAction';
type Database = any;

export default function DashboardPanels({ session }: { session: Session }) {
	const supabase = useSupabaseClient<Database>();
	const supabaseUser = useUser();
	const [loading, setLoading] = useState(true);
	const [collectibles, setCollectibles] = useState<any>(null);
	const [fetchError, setFetchError] = useState('');

	useEffect(() => {
		const fetchCollectibles = async () => {
			const { data, error } = await supabase
				.from('collectibles_duplicate')
				.select()
				.eq('user_id', supabaseUser?.id);

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
		<div className='p-4 sm:ml-64'>
			<div className='rounded-lg mt-16'>
				<CallToAction session={session} />
				<div className='flex items-center justify-center p-2 mb-4 rounded bg-gray-50 dark:bg-gray-800'>
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
									item: { title: any; category: any; year_manufactured: any; grade_level: any },
									i: any
								) => (
									<tr key={`${item.year_manufactured}-${i}`}>
										<td
										className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
										>
										{item.title}
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
					<p className='text-2xl text-gray-400 dark:text-gray-500'>+</p>
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
