import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import CallToAction from '../components/CallToAction';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import DashboardPanels from '../components/DashboardPanels';

const Dashboard = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      <Navbar session={session} />
      <Sidebar session={session} />
      <DashboardPanels session={session}/>
    </>
  );
};

export default Dashboard;
