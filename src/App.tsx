import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/HomePage';
import ResortDetailPage from './pages/ResortDetailPage';

// Base path must match vite.config.ts `base` setting and the GitHub Pages repo name.
// Update both if the repository is renamed.
const BASE_PATH = '/ghcp-car-challenge';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={BASE_PATH}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resort/:id" element={<ResortDetailPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
