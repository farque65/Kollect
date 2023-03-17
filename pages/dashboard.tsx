import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import CallToAction from '../components/CallToAction';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import DashboardPanels from '../components/DashboardPanels';
import { useEffect, useContext } from 'react';
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const { user } = useContext(UserContext);

  // useEffect(()=> {
  //   console.log("check user ", user)
  // },[])

  return (
    <>
      <Navbar session={session} />
      <Sidebar session={session} />
      <DashboardPanels session={session}/>
    </>
  );
};

export default Dashboard;
