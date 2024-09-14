import { Route } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Basket from "../pages/Basket";
import DetailProducts from "../pages/products/DetailProducts";
import AllProducts from "../pages/products/AllProducts";
import Category from "../pages/Category";
const routes = (
  <Route path="/" element={<RootLayout />}>
    <Route index element={<Home />} />
    <Route path="basket" element={<Basket />} />
    <Route path="detail/:id" element={<DetailProducts />} />
    <Route path="all-products" element={<AllProducts />} />
    <Route path="products/:slug" element={<Category />} />
  </Route>
);

export default routes;
