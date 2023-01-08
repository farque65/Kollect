import { useState, useEffect } from 'react';
import {
	useUser,
	useSupabaseClient,
	Session,
} from '@supabase/auth-helpers-react';
import Card from '../components/Card';
type Database = any;

export default function Account({
	session,
	collectibles,
}: {
	session: Session;
	collectibles: any;
}) {
	const supabase = useSupabaseClient<Database>();
	const user = useUser();
	const [loading, setLoading] = useState(true);

	return (
		<div className='flex flex-wrap mt-10 mb-10'>
			{collectibles &&
				collectibles.map(
					(
						item: { year_manufactured: any; category: any; item_detail: any },
						i: any
					) => (
						<Card
							key={`${item.year_manufactured}-${i}`}
							category={item.category}
							year_manufactured={item.year_manufactured}
							session={session}
							grade_company={undefined}
						/>
					)
				)}
		</div>
	);
}
