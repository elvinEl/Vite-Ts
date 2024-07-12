import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
//LAYOUTS
import RootLayout from "./layouts/RootLayout";
//PAGES
import Home from "./pages/Home";
import Basket from "./pages/Basket";
import DetailProducts from "./components/products/DetailProducts";
import AllProducts from "./components/products/AllProducts";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="basket" element={<Basket />} />
        <Route path="detail/:id" element={<DetailProducts />} />
        <Route path="all-products" element={<AllProducts />} />
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
