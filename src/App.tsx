import { MainLayout } from 'components';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('pages/Home'));
function App() {
  return (
    <Suspense fallback={<MainLayout />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<div>page not found</div>} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
