import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import About from "./Component/About/About";
import Main from "./Layout/Main";
import Shop from "./Component/Shop/Shop";
import Oders from "./Component/Oders/Oders";
import Inventory from "./Component/Inventory/Inventory";
import { ProductsAndCartLoader } from "./Loaders/ProductsAndCartLoader";
import NotFound from "./Component/NotFound/NotFound";
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
import Shipping from "./Component/Shipping/Shipping";
import PrivateRoute from "./Routes/PrivateRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          loader: ProductsAndCartLoader,
          element: <Shop />,
        },
        {
          path: "/orders",
          loader: ProductsAndCartLoader,
          element: <Oders />,
        },
        {
          path: "/inventory",
          element: (
            <PrivateRoute>
              <Inventory />
            </PrivateRoute>
          ),
        },
        {
          path: "/shipping",
          element: (
            <PrivateRoute>
              <Shipping />
            </PrivateRoute>
          ),
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
