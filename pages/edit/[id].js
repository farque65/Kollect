// @ts-nocheck
// /pages/edit/[id].js
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
// import { supabase } from '../../utils/supabase';

const Edit = () => {
	const [workout, setWorkout] = useState('');
	const router = useRouter();

	const { id } = router.query;
	// useEffect(() => {
	// 	const user = supabase.auth.user();
	// 	const getWorkout = async () => {
	// 		const { data } = await supabase
	// 			.from('workouts')
	// 			.select('*')
	// 			.eq('user_id', user?.id)
	// 			.filter('id', 'eq', id)
	// 			.single();
	// 		setWorkout(data);
	// 	};
	// 	getWorkout();
	// }, [id]);

	const handleOnChange = (e) => {
		setWorkout({
			...workout,
			[e.target.name]: e.target.value,
		});
	};

	const { title, loads, reps } = workout;
	// const updateWorkout = async () => {
	// 	const user = supabase.auth.user();
	// 	const { data } = await supabase
	// 		.from('workouts')
	// 		.update({
	// 			title,
	// 			loads,
	// 			reps,
	// 		})
	// 		.eq('id', id)
	// 		.eq('user_id', user?.id);

	// 	alert('Workout updated successfully');

	// 	router.push('/');
	// };
	return (
		<div>
			<div>
				<h1>Edit Workout</h1>
				<label> Title:</label>
				<input
					type='text'
					name='title'
					value={workout.title}
					onChange={handleOnChange}
				/>
				<label> Load (kg):</label>
				<input
					type='text'
					name='loads'
					value={workout.loads}
					onChange={handleOnChange}
				/>
				<label> Reps:</label>
				<input
					type='text'
					name='reps'
					value={workout.reps}
					onChange={handleOnChange}
				/>

				{/* <button onClick={updateWorkout}>Update Workout</button> */}
			</div>
		</div>
	);
};

export default Edit;
