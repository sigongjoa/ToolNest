import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Review from "@/pages/review";
import NotFound from "@/pages/not-found";
import AiSites from "@/pages/AiSites";
import UsefulSites from "@/pages/UsefulSites";
import OfficeWorkerAiSites from "@/pages/OfficeWorkerAiSites";
import StudentAiSites from "@/pages/StudentAiSites";

function Router() {
  console.debug('Router 컴포넌트 시작');
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/ai-sites" component={AiSites} />
      <Route path="/useful-sites" component={UsefulSites} />
      <Route path="/officeworker-ai-sites" component={OfficeWorkerAiSites} />
      <Route path="/student-ai-sites" component={StudentAiSites} />
      <Route path="/reviews/:slug" component={Review} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
