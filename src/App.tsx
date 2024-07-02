import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Basket from "./pages/Basket";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="basket" element={<Basket />} />
      </Route>
    )
  );
  return (
    <div className="max-w-[80%] mx-auto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
