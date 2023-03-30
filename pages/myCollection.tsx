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
import { useEffect, useState } from 'react';
import ItemAdd from '../components/ItemAdd';
import ItemList from '../components/ItemList';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MyCollection = () => {
	const session = useSession();
	const supabase = useSupabaseClient();
	const supabaseUser = useUser();
	const [collectibles, setCollectibles] = useState<any>(null);
	const [fetchError, setFetchError] = useState('');

	const { isOpen, onOpen, onClose } = useDisclosure()

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
			<Navbar session={session} />
			<div>
				{session && (
					<>
						<Sidebar session={session} />
						<div className='p-4 sm:ml-64'>
							<div className='p-4 rounded-lg mt-14 '>
								<nav
									aria-label="Site Nav"
									className="mx-auto flex max-w-3xl items-center justify-between p-4"
									>

									<ul className="flex items-center gap-2 text-sm font-medium text-gray-500">
											<li>
											<button className='bg-black border-2 border-white p-2' onClick={getCsv}>Get CSV</button>
											</li>
											<li>
											<Button className='text-black' onClick={onOpen}>Open Modal</Button>

											<Modal isOpen={isOpen} onClose={onClose}>
											  <ModalOverlay />
											  <ModalContent>
												<ModalHeader>
													<h1 className='text-black'>
													Add Item
													</h1>
												</ModalHeader>
												<ModalCloseButton />
												<ModalBody>
													<h1 className='text-center text-2xl font-bold text-black sm:text-3xl md:text-5xl'>
													Add Item
													</h1>
													{session && <ItemAdd session={session} />}
												</ModalBody>
											  </ModalContent>
											</Modal>
											</li>
											<li className="hidden lg:block">
											<a className="rounded-lg px-3 py-2" href="/"> Home </a>
											</li>

											<li><a className="rounded-lg px-3 py-2" href=""> Projects </a></li>

											<li>
											<a
												className="inline-flex items-center gap-2 rounded-lg px-3 py-2"
												href=""
												target="_blank"
											>
												External

												<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												className="h-4 w-4"
												>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
												></path>
												</svg>
											</a>
											</li>
										</ul>
									</nav>

								<div className='flex items-center justify-center py-20 mb-4 rounded bg-gray-dark'>
									<ItemList session={session} collectibles={collectibles} />
								</div>
								<div className='grid grid-cols-2 gap-4 mb-4'>
									<div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
										<p className='text-2xl text-gray-400 dark:text-gray-500'>
											+
										</p>
									</div>
									<div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
										<p className='text-2xl text-gray-400 dark:text-gray-500'>
											+
										</p>
									</div>
									<div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
										<p className='text-2xl text-gray-400 dark:text-gray-500'>
											+
										</p>
									</div>
									<div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
										<p className='text-2xl text-gray-400 dark:text-gray-500'>
											+
										</p>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default MyCollection;
