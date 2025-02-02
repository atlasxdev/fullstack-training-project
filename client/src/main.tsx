import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { SessionProvider } from "@/context/SessionContext.tsx";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Toaster
                richColors
                offset={{
                    bottom: 0,
                    left: 0,
                    right: 60,
                    top: 0,
                }}
            />
            <QueryClientProvider client={queryClient}>
                <SessionProvider>
                    <App />
                </SessionProvider>
            </QueryClientProvider>
        </ThemeProvider>
    </StrictMode>
);
