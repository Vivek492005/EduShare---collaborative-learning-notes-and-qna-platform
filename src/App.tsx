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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/discussions" element={<DiscussionsPage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/papers" element={<PapersPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
