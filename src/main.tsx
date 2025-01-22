import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { SessionProvider } from "@/context/SessionContext.tsx";
import AuthGate from "@/routes/AuthGate.tsx";
import Homepage from "@/pages/Homepage.tsx";
import PublicRoute from "@/routes/PublicRoute.tsx";
import SignInPage from "./pages/auth/SignInPage.tsx";
import SignUpPage from "./pages/auth/SignUpPage.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Toaster richColors position="top-center" />
            <SessionProvider>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <PublicRoute>
                                    <App />
                                </PublicRoute>
                            }
                        />

                        <Route
                            path="/sign-in"
                            element={
                                <PublicRoute>
                                    <SignInPage />
                                </PublicRoute>
                            }
                        />

                        <Route
                            path="/sign-up"
                            element={
                                <PublicRoute>
                                    <SignUpPage />
                                </PublicRoute>
                            }
                        />

                        <Route
                            path="/homepage"
                            element={
                                <AuthGate>
                                    <Homepage />
                                </AuthGate>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </SessionProvider>
        </ThemeProvider>
    </StrictMode>
);
