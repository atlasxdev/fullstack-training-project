import Loading from "@/components/loading";
import { SessionContext } from "@/hooks/use-session";
import supabase from "@/supabase";
import { Session } from "@supabase/supabase-js";
import { ReactNode, useEffect, useState } from "react";

export function SessionProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const authStateListener = supabase.auth.onAuthStateChange(
            async (_, session) => {
                setSession(session);
                setIsLoading(false);
            }
        );

        return () => {
            authStateListener.data.subscription.unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supabase]);

    return (
        <SessionContext.Provider value={{ session }}>
            {isLoading ? <Loading /> : children}
        </SessionContext.Provider>
    );
}
