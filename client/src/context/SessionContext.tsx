import Loading from "@/components/loading";
import { SessionContext } from "@/hooks/use-session";
import useSessionListener from "@/hooks/use-session-listener";
import { Session } from "@supabase/supabase-js";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    initialSession?: Session | null;
};

export function SessionProvider({ children, initialSession = null }: Props) {
    const { isLoading, session } = useSessionListener(initialSession);

    return (
        <SessionContext.Provider value={{ session }}>
            {isLoading ? <Loading /> : children}
        </SessionContext.Provider>
    );
}
