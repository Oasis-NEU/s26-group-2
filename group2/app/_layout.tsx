import { useEffect } from 'react';
import { Slot, useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold } from '@expo-google-fonts/dm-sans';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (!fontsLoaded) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      router.replace(session ? '/(main)' : '/loginPage');
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        router.replace('/(main)');
      } else if (event === 'SIGNED_OUT') {
        router.replace('/loginPage');
      }
    });

    return () => subscription.unsubscribe();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return <Slot />;
}