import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index.tsx";
import NotesPage from "./pages/NotesPage.tsx";
import DiscussionsPage from "./pages/DiscussionsPage.tsx";
import GroupsPage from "./pages/GroupsPage.tsx";
import PapersPage from "./pages/PapersPage.tsx";
import NewsPage from "./pages/NewsPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import NotFound from "./pages/NotFound.tsx";

import { AuthProvider } from "@/hooks/useAuth";
import LoginPage from "./pages/LoginPage";

import PageTransitions from "@/components/layout/PageTransitions";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const MainRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransitions><Index /></PageTransitions>} />
        <Route path="/notes" element={<PageTransitions><NotesPage /></PageTransitions>} />
        <Route path="/discussions" element={<PageTransitions><DiscussionsPage /></PageTransitions>} />
        <Route path="/groups" element={<PageTransitions><GroupsPage /></PageTransitions>} />
        <Route path="/papers" element={<PageTransitions><PapersPage /></PageTransitions>} />
        <Route path="/news" element={<PageTransitions><NewsPage /></PageTransitions>} />
        <Route path="/dashboard" element={<PageTransitions><DashboardPage /></PageTransitions>} />
        <Route path="*" element={<PageTransitions><NotFound /></PageTransitions>} />
      </Routes>
    </AnimatePresence>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/EduShare---collaborative-learning-notes-and-qna-platform/">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/*"
              element={
                <AppLayout>
                  <MainRoutes />
                </AppLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
