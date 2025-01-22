import { ReactNode } from "react";
import { useSession } from "@/hooks/use-session";
import { Navigate } from "react-router";

function AuthGate({ children }: { children: ReactNode }) {
    const { session } = useSession();

    if (!session) {
        return <Navigate to={"/"} />;
    }

    return <>{children}</>;
}

export default AuthGate;
