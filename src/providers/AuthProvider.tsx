import { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabase";

type AuthContext = {
  session: Session | null;
  user: User | null;
};

const AuthContext = createContext<AuthContext>({
  session: null,
  user: null,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
