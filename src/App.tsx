import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth Pages
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";

// User & Admin Dashboards
import UserDashboard from "./pages/user/dashboard";
import AdminDashboard from "./pages/admin/dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Halaman Publik */}
          <Route path="/" element={<Index />} />

          {/* Auth Pages */}
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />

          {/* User Portal */}
          <Route path="/user/dashboard" element={<UserDashboard />} />

          {/* Admin Portal */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Fallback 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
