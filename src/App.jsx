import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";

const BaseLayout = lazy(() => import("./layouts/Base"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Catalog = lazy(() => import("./pages/Catalog"));
const Home = lazy(() => import("./pages/Home"));
const Truck = lazy(() => import("./pages/Truck"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<BaseLayout className="flex-1" />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route
          path="/catalog/:id"
          element={<BaseLayout className="flex-1 pt-12 pb-20" />}
        >
          <Route index element={<Truck />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
