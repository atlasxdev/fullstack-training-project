import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { SessionProvider } from "@/context/SessionContext.tsx";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Toaster richColors position="top-center" theme="light" />
            <QueryClientProvider client={queryClient}>
                <SessionProvider>
                    <App />
                </SessionProvider>
            </QueryClientProvider>
        </ThemeProvider>
    </StrictMode>
);
