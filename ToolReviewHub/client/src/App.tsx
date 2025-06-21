import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ToolsList from './pages/ToolsList';
import ToolDetail from './pages/ToolDetail';
import NotFound from './pages/not-found';
import { WeightsProvider } from './context/WeightsContext';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import Header from './components/header';
import Footer from './components/footer';

const queryClient = new QueryClient();

function App() {
  console.debug('App: Rendering application.');
  return (
    <QueryClientProvider client={queryClient}>
      <WeightsProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Router>
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<ToolsList />} />
                <Route path="/tools" element={<ToolsList />} />
                <Route path="/tools/:slug" element={<ToolDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </Router>
          <Toaster />
        </ThemeProvider>
      </WeightsProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
