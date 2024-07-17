import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import routes from "./routes/Routes";
function App() {
  const router = createBrowserRouter(createRoutesFromElements(routes));
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
