import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RegionSelect from "./pages/RegionSelect";
import Catalog from "./pages/Catalog";
import PropertyDetail from "./pages/PropertyDetail";
import Favorites from "./pages/Favorites";
import Contacts from "./pages/Contacts";
import About from "./pages/About";
import Developers from "./pages/Developers";
import ResidentialComplex from "./pages/ResidentialComplex";
import ComplexDetail from "./pages/ComplexDetail";
import Compare from "./pages/Compare";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import CompareBar from "./components/CompareBar";
import { ComparisonProvider } from "./hooks/useComparison";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ComparisonProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/region-select" element={<RegionSelect />} />
              <Route path="/" element={<Index />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/about" element={<About />} />
              <Route path="/developers" element={<Developers />} />
              <Route path="/residential-complex" element={<ResidentialComplex />} />
              <Route path="/complex/:id" element={<ComplexDetail />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CompareBar />
          </BrowserRouter>
        </ComparisonProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
