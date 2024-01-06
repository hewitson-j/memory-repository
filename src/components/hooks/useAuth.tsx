import { useEffect, useState } from "react";
import supabase from "../../supabaseconfig";

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setAuthenticated(!!user);
    };

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthenticated(!!session);
        console.log(event);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return authenticated;
};
