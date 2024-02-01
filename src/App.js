import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import About from "./Component/About/About";
import Main from "./Layout/Main";
import Shop from "./Component/Shop/Shop";
import Oders from "./Component/Oders/Oders";
import Inventory from "./Component/Inventory/Inventory";
import { ProductsAndCartLoader } from "./Loaders/ProductsAndCartLoader";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          loader: ProductsAndCartLoader,
          element: <Shop></Shop>,
        },
        {
          path: "/orders",
          loader: ProductsAndCartLoader,
          element: <Oders></Oders>,
        },
        {
          path: "/inventory",
          element: <Inventory></Inventory>,
        },
        {
          path: "/about",
          element: <About></About>,
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
