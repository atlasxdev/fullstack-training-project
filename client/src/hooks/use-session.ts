import type { Session } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

type ContextProps = {
    session: Session | null;
};

export const SessionContext = createContext<ContextProps>({
    session: null,
});

export function useSession() {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
}
