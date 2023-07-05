import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useContext, useEffect } from 'react';
import DashboardPanels from '../components/DashboardPanels';
import Sidebar from '../components/Sidebar';
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const supabaseUser = useUser();
  const { user, setUser, userid, setUserid } = useContext(UserContext);

	useEffect(()=> {
		if(supabaseUser) {
			setUser(supabaseUser);	
			setUserid(supabaseUser?.id.toString());
		}
	  },[])

  return (
    <div className='bg-gray-600'>
      <Sidebar session={session} />
      <DashboardPanels session={session}/>
    </div>
  );
};

export default Dashboard;
