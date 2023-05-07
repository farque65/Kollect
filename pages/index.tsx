import {
  useSession,
  useSupabaseClient,
  useUser
} from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useContext, useEffect } from 'react';
import About from '../components/About';
import CallToAction from '../components/CallToAction';
import DashboardPanels from '../components/DashboardPanels';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

// -- Next Methods

import { UserContext } from '../context/UserContext';

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const supabaseUser = useUser();
  const { user, setUser } = useContext(UserContext);

  useEffect(()=> {
    if(supabaseUser) {
      setUser(supabaseUser);
      localStorage.setItem('kollectclubid', supabaseUser?.id);
    }
  },[])

  return (
    <div>
      <Navbar session={session} />

      {session ? (
        <>
          <Sidebar session={session} />
            <DashboardPanels session={session} />          
        </>
      ) : (
        <>
          <CallToAction session={session} />
          <About />
          <div className="container py-20" id="signin">
            <Auth
              providers={['facebook', 'google']}
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#283362',
                      brandAccent: '#283362',
                      defaultButtonBorder: '#283362',
                    },
                  },
                },
              }}
              socialLayout="horizontal"
            />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
