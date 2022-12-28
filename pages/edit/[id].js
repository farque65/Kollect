// @ts-nocheck
// /pages/edit/[id].js
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
import styles from '../../styles/Edit.module.css';
import { supabase } from '../../utils/supabase';

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
	const updateWorkout = async () => {
		const user = supabase.auth.user();
		const { data } = await supabase
			.from('workouts')
			.update({
				title,
				loads,
				reps,
			})
			.eq('id', id)
			.eq('user_id', user?.id);

		alert('Workout updated successfully');

		router.push('/');
	};
	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<h1 className={styles.title}>Edit Workout</h1>
				<label className={styles.label}> Title:</label>
				<input
					type='text'
					name='title'
					value={workout.title}
					onChange={handleOnChange}
					className={styles.updateInput}
				/>
				<label className={styles.label}> Load (kg):</label>
				<input
					type='text'
					name='loads'
					value={workout.loads}
					onChange={handleOnChange}
					className={styles.updateInput}
				/>
				<label className={styles.label}> Reps:</label>
				<input
					type='text'
					name='reps'
					value={workout.reps}
					onChange={handleOnChange}
					className={styles.updateInput}
				/>

				<button onClick={updateWorkout} className={styles.updateButton}>
					Update Workout
				</button>
			</div>
		</div>
	);
};

export default Edit;
