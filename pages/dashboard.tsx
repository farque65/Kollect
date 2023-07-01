import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import CallToAction from '../components/CallToAction';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import DashboardPanels from '../components/DashboardPanels';
import { useEffect, useContext } from 'react';
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
    <>
      <Sidebar session={session} />
      <DashboardPanels session={session}/>
    </>
  );
};

export default Dashboard;
