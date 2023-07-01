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
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
	Session, useSupabaseClient, useUser
} from '@supabase/auth-helpers-react';
import Sidebar from '../../components/Sidebar';
type Database = any;
type Collectible = Database['public']['Tables']['collectibles_duplicate']['Row'];

const Details = ({ session }: { session: Session }) => {
    const router = useRouter()
    const supabaseUser = useUser();
    const supabase = useSupabaseClient<Database>();
    const [collectible, setCollectible] = useState<any>([]);
	const [fetchError, setFetchError] = useState('');
    const [avatarUrl, setAvatarUrl] = useState<Collectible['collectible_image_url']>(null);
    const [disableEdit, setDisableEdit] = useState<boolean>(true);
    const [loading, setLoading] = useState(true);

    //input items
    const [title, setTitle] = useState(collectible[0]?.title);
    const [description, setDesription] = useState(collectible[0]?.description);
    const [category, setCategory] = useState(collectible[0]?.category);
    const [year_manufactured, setYearManufactured] = useState(collectible[0]?.year_manufactured);

    const { isOpen, onOpen, onClose } = useDisclosure()

    const saveCollectible = async () => {
        try {
            setLoading(true);
			if (!collectible[0]) throw new Error('Item not found');

            const itemId = router?.query?.slug;

            const updates = {
				id: itemId,
				title,
				description,
                category,
                year_manufactured
			};

            let { error } = await supabase.from('collectibles_duplicate').upsert(updates);
			if (error) throw error;
			alert('Item updated!');

		} catch (error) {
			alert(JSON.stringify(error));
			console.log(error);
		} finally {
			setLoading(false);
		}
    }

    const deleteCollectible = async () => {
        const userId = localStorage.getItem('kollectclubid') || supabaseUser?.id;
        const itemId = router?.query?.slug;

        const { error } = await supabase
        .from('collectibles_duplicate')
        .delete()
        .match({user_id: userId, id: itemId})

        if(!error) {
            alert('Item Deleted');
            router.push('/myCollection')
        }
    }

    const fetchCollectibles = async () => {
        const userId = localStorage.getItem('kollectclubid') || supabaseUser?.id;
        const itemId = router?.query?.slug;
    
        const { data, error } = await supabase
            .from('collectibles_duplicate')
            .select()
            .match({user_id: userId, id: itemId});
    
        if (error) {
            setFetchError('could not fetch collectibles');
            setCollectible(null);
            console.log(error);
        }
    
        if (data) {
            setCollectible(data);
            setFetchError('');

            setTitle(data[0]?.title);
            setDesription(data[0]?.description);
            setCategory(data[0]?.category);
            setYearManufactured(data[0]?.year_manufactured);
        }
    };
    
    useEffect(() => {
        console.table(router);
        if(router.query.slug) {
            fetchCollectibles();
        }
    }, [router]);

    useEffect(() => {
		if (collectible[0]?.collectible_image_url) downloadImage(collectible[0]?.collectible_image_url);
	}, [collectible]);

	async function downloadImage(path: string) {
		try {
			const { data, error } = await supabase.storage
				.from('collectible_duplicate_image')
				.download(path);
			if (error) {
				throw error;
			}
			const url = URL.createObjectURL(data);
			setAvatarUrl(url);
		} catch (error) {
			console.log('Error downloading image: ', error);
		}
	}


    return (
        <div>
            <Sidebar session={session} />
            <div className='p-4 sm:ml-64 mb-10'>
			    <div className='rounded-lg mt-8'>
                    {/*JSON.stringify(collectible)*/}

                <section>
                <div className="relative mx-auto max-w-screen-xl px-4 py-8">
                    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                            {collectible[0]?.collectible_image_url ? 
                                <img
                                alt="Collectible Image Url"
                                src={avatarUrl}
                                className="h-40 w-40 rounded-md object-cover"
                            />
                            :
                                <img
                                alt="Home"
                                src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                className="h-40 w-40 rounded-md object-cover"
                            />}
                        </div>

                    <div className="sticky top-0">
                        <button
                        className="rounded-full border border-red-600 hover:bg-red-100 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-red-600"
                        onClick={onOpen}
                        >
                        Delete
                        </button>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                            <ModalCloseButton className='text-black hover:bg-red-500' />
                            <ModalBody>
                                <p className='text-center text-l text-black p-10'>
                                Are you sure you want to delete <span className='font-bold'>{collectible[0]?.title}</span>?
                                </p>
                                <button 
                                className='w-full text-black hover:bg-red-500'
                                onClick={()=> {
                                    console.log('delete item');
                                    deleteCollectible();
                                }}>
                                    Yes
                                </button>
                            </ModalBody>
                            </ModalContent>
                        </Modal>

                        <button
                        className="ml-2 rounded-full border border-green-600 hover:bg-green-100 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-green-600"
                        onClick={()=> {
                            setDisableEdit(!disableEdit);
                        }}
                        >
                        Edit
                        </button>

                        <button
                        className="ml-2 rounded-full border border-blue-600 hover:bg-blue-100 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600"
                        hidden={disableEdit}
                        onClick={()=> {
                            saveCollectible();
                        }}
                        >
                        Save
                        </button>

                        <div className="mt-8 flex justify-between">
                        <div className="max-w-[35ch] space-y-2">
                            {/*<h1 className="text-xl font-bold sm:text-2xl">
                                {collectible[0]?.title}
                            </h1>*/}
                            <input onChange={(e)=>setTitle(e.target.value)} value={title}  disabled={disableEdit}/>
                        </div>

                        </div>

                        <div className="mt-4">
                            <h1 className="text-gray-500 font-bold" >Description</h1>
                            <div className="prose max-w-none">
                                {/*<p>
                                    {collectible[0]?.description}
                                </p>*/}
                                <input onChange={(e)=>setDesription(e.target.value)} value={description}  disabled={disableEdit}/>
                            </div>

                        </div>

                        <form className="mt-8">
                        <fieldset>

                            <div className="flex flex-wrap gap-1">
                                <div className="md:flex md:items-center mb-6">
                                    <div>
                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                        Category
                                    </label>
                                    </div>
                                    {/*<div className="md:w-2/3">
                                        {collectible[0]?.category}                                    
                                    </div>*/}
                                    <input onChange={(e)=>setCategory(e.target.value)} value={category}   disabled={disableEdit}/>
                                </div>                        
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="flex flex-wrap gap-1">
                                <div className="md:flex md:items-center mb-6">
                                    <div>
                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                        Year Manufactured
                                    </label>
                                    </div>
                                    {/*<div className="md:w-2/3">
                                        {collectible[0]?.year_manufactured}                                    
                                    </div>*/}
                                    <input onChange={(e)=>setYearManufactured(e.target.value)} value={year_manufactured} disabled={disableEdit} type="date"/>
                                </div>                        
                            </div>
                        </fieldset>
                        
                        {/*
                        <div className="mt-8 flex gap-4">
                            <div>
                            <label for="quantity" className="sr-only">Qty</label>

                            <input
                                type="number"
                                id="quantity"
                                min="1"
                                value="1"
                                className="w-12 rounded border-gray-200 py-3 text-center text-xs [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                            />
                            </div>

                            <button
                            type="submit"
                            className="block rounded bg-green-600 px-5 py-3 text-xs font-medium text-white hover:bg-green-500"
                            >
                            Add to Cart
                            </button>
                        </div>
                        */}
                        </form>
                    </div>
                    </div>
                </div>
                </section>
                </div>
            </div>
        </div>
    );
}

export default Details;