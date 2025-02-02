import { BrowserRouter, Routes, Route } from "react-router";
import AuthGate from "@/routes/AuthGate.tsx";
import Homepage from "@/pages/Homepage.tsx";
import PublicRoute from "@/routes/PublicRoute.tsx";
import SignInPage from "./pages/auth/SignInPage.tsx";
import SignUpPage from "./pages/auth/SignUpPage.tsx";
import AccountSettings from "./pages/AccountSettings.tsx";
import Navbar from "./components/navbar.tsx";
import NotFound from "@/pages/NotFound.tsx";
import Index from "./index.tsx";
import Article from "./pages/Article.tsx";
import CreateArticle from "./pages/CreateArticle.tsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <Index />
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
                    path="/home"
                    element={
                        <AuthGate>
                            <Homepage />
                        </AuthGate>
                    }
                />

                <Route
                    path="/create-article"
                    element={
                        <AuthGate>
                            <CreateArticle />
                        </AuthGate>
                    }
                />

                <Route
                    path="/account-settings"
                    element={
                        <AuthGate>
                            <AccountSettings />
                        </AuthGate>
                    }
                />

                <Route
                    path="/articles/:id"
                    element={
                        <AuthGate>
                            <Article />
                        </AuthGate>
                    }
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
