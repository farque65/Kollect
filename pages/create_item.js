// @ts-nocheck
// /pages/create.js

import { supabase } from '../utils/supabase';
import { useState } from 'react';
import { useRouter } from 'next/router';
import React from 'react';

const Create = () => {
	const initialState = {
		title: '',
		loads: '',
		reps: '',
	};

	const router = useRouter();
	const [workoutData, setWorkoutData] = useState(initialState);

	const { title, loads, reps } = workoutData;

	const handleChange = (e) => {
		setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
	};

	const createWorkout = async () => {
		try {
			const user = supabase.auth.user();

			const { data, error } = await supabase
				.from('workouts')
				.insert([
					{
						title,
						loads,
						reps,
						user_id: user?.id,
					},
				])
				.single();
			if (error) throw error;
			alert('Workout created successfully');
			setWorkoutData(initialState);
			router.push('/');
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<>
			<div>
				<div>
					<p>Create a New Workout</p>
					<label>Title:</label>
					<input
						type='text'
						name='title'
						value={title}
						onChange={handleChange}
						placeholder='Enter a title'
					/>
					<label>Load (kg):</label>
					<input
						type='text'
						name='loads'
						value={loads}
						onChange={handleChange}
						placeholder='Enter weight load'
					/>
					<label>Reps:</label>
					<input
						type='text'
						name='reps'
						value={reps}
						onChange={handleChange}
						placeholder='Enter number of reps'
					/>

					<button onClick={createWorkout}>Create Workout</button>
				</div>
			</div>
		</>
	);
};

export default Create;
