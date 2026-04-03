import { useEffect } from 'react';
import { Slot, useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in on app launch
    supabase.auth.getSession().then(({ data: { session } }) => {
      router.replace(session? '/(main)' : './index');
    });

    // Listen for login/logout events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      router.replace(session ? '/(main)' : './index');}
    else if (event === 'SIGNED_OUT') {
      router.replace('/loginPage');}
  });

    // Cleanup listener when component unmounts
    return () => subscription.unsubscribe();
  }, []);

  return <Slot />;
}