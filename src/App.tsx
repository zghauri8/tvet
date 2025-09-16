import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import JobsPage from "./pages/JobsPage";
import CompaniesPage from "./pages/CompaniesPage";
import AboutPage from "./pages/AboutPage";
import ResultsPage from "./pages/ResultsPage";
import NotFound from "./pages/NotFound";
import Setup from "./pages/Setup";
import LoginView from "./views/LoginView";
import SignupView from "./views/SignupView";
import DashboardView from "./views/DashboardView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/signup" element={<SignupView />} />
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/setup" element={<Setup />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
