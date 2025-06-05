import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'

const BaseLayout = lazy(() => import('./layouts/Base'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const Catalog = lazy(() => import('./pages/Catalog'));
const Home = lazy(() => import('./pages/Home'));
const Truck = lazy(() => import('./pages/Truck'));

function App() {

  return <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="catalog/:id" element={<Truck />}>
            {/* <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} /> */}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
}

export default App
