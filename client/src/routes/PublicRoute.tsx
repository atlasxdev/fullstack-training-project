import { ReactNode } from "react";
import { useSession } from "@/hooks/use-session";
import { Navigate } from "react-router";

function PublicRoute({ children }: { children: ReactNode }) {
    const { session } = useSession();

    if (session) {
        return <Navigate to={"/home"} />;
    }

    return <>{children}</>;
}

export default PublicRoute;
