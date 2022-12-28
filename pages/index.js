// @ts-nocheck
// /pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { v4 as uuidv4 } from 'uuid';
import CardList from '../components/CardList';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

export default function Home({ session }) {
	const [name, setName] = useState('');
	const [fetchError, setFetchError] = useState(null);
	const [collectibles, setCollectibles] = useState(null);

	const uuid = uuidv4();
	const start = Date.now();

	const createUser = async () => {
		try {
			const user = supabase.auth.getUser();
			console.log('view first ', user);
			const { data, error } = await supabase.from('collectibles').insert({
				type: 'cool beans',
				grade: '96%',
			});
			if (error) throw error;
			console.log(`view it ${data}`);
		} catch (error) {
			alert(error.message);
		}
	};

	useEffect(() => {
		const fetchCollectibles = async () => {
			const { data, error } = await supabase.from('collectibles').select();

			if (error) {
				setFetchError('could not fetch collectibles');
				setCollectibles(null);
				console.log(error);
			}
			if (data) {
				setCollectibles(data);
				setFetchError(null);
			}
		};
		fetchCollectibles();
	}, []);

	return (
		<div>
			<CallToAction />
			<CardList collectibles={collectibles} />
			<div>{fetchError && <p>{fetchError}</p>}</div>
			<Footer />
			{/* <form>
				<h1>Add a user</h1>
				<label>
					user email:{' '}
					<input
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<br />
				<br />
				<button onClick={createUser}>Create User</button>
			</form> */}
		</div>
	);
}
