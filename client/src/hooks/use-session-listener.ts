import supabase from "@/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

function useSessionListener(initialSession: Session | null) {
    const [session, setSession] = useState<Session | null>(initialSession);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    return { session, isLoading };
}

export default useSessionListener;
