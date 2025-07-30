import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseLearning from "./pages/CourseLearning";
import Assignments from "./pages/Assignments";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import TestQuiz from "./pages/TestQuiz";
import NotFound from "./pages/NotFound";
import ProactiveAvatar from "./components/ProactiveAvatar";
import MainLayout from "./MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Index />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:courseId" element={<CourseLearning />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/test/:testId" element={<TestQuiz />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <ProactiveAvatar />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
