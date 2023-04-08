import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Footer from '../components/Footer';
import ItemAdd from '../components/ItemAdd';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div>
      <Navbar session={session} />
      <Sidebar session={session} />
      <div className="container p-2 mb-10">
        <h1 className="text-center text-2xl font-bold text-white sm:text-3xl md:text-5xl">
          Add Collectible
        </h1>
        {session && <ItemAdd session={session} />}
      </div>
    </div>
  );
};

export default Home;
