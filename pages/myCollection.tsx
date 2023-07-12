import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button
} from '@chakra-ui/react';
import {
	useSession,
	useSupabaseClient,
	useUser
} from '@supabase/auth-helpers-react';
import { ExportToCsv } from 'export-to-csv';
import { useContext, useEffect, useState } from 'react';
import ItemAdd from '../components/ItemAdd';
import ItemList from '../components/ItemList';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import { UserContext } from '../context/UserContext';

const MyCollection = () => {
	const session = useSession();
	const supabase = useSupabaseClient();
	const supabaseUser = useUser();
	const [collectibles, setCollectibles] = useState<any>(null);
	const [fetchError, setFetchError] = useState('');
	const { user, setUser, userid, setUserid } = useContext(UserContext);
	const [filterCategories, setFilterCategories] = useState(['all']);
	const [category, setCategory] = useState('all');

	const { isOpen, onOpen, onClose } = useDisclosure()

	useEffect(() => {
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
		fetchCollectibles();
	}, [category]);

	function getCsv() {
		const options = { 
			fieldSeparator: ',',
			quoteStrings: '"',
			decimalSeparator: '.',
			showLabels: true, 
			showTitle: true,
			title: 'My Awesome CSV',
			useTextFile: false,
			useBom: true,
			useKeysAsHeaders: true,
			headers: ['Title', 'Category', 'Year Manufactured', 'Grade Level']
		  };
		 
		const csvExporter = new ExportToCsv(options);
		 
		csvExporter.generateCsv(collectibles);
	}

	return (
			<div>
				{session && (
					<div>
						<Sidebar session={session} />
						<div className='px-4 sm:ml-64'>


								<div className='items-center justify-center py-4 mb-40 rounded'>
									<h1 className='text-center text-white text-4xl py-2 rounded'>My Collection</h1>
									<ul className="flex flex-row text-gray-500 py-6">
												<li>
												<a className='text-white bg-gray-800 text-2xl p-2 mr-2 rounded hover:bg-gray-500 hover:text-black' onClick={getCsv}>Get CSV</a>
												</li>
												<li>
												<a className='text-white bg-gray-800 text-2xl p-2 rounded hover:bg-gray-500 hover:text-black' onClick={onOpen}>Add Item</a>

												<Modal isOpen={isOpen} onClose={onClose}>
													<ModalOverlay />
													<ModalContent>
														<ModalHeader>
															<h1 className='text-black'>
															Add Item
															</h1>
														</ModalHeader>
														<ModalCloseButton className='text-black' />
														<ModalBody>
															<h1 className='text-center text-2xl font-bold text-black sm:text-3xl md:text-5xl'>
															Add Item
															</h1>
															{session && <ItemAdd session={session} />}
														</ModalBody>
													</ModalContent>
												</Modal>
												</li>
									</ul>
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
									<ItemList session={session} collectibles={collectibles} />
								</div>
							</div>
						
					</div>
				)}
			</div>
	);
};

export default MyCollection;
