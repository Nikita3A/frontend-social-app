import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";

import "./App.css";
import Signin from "./pages/signin/signin";
import Signup from "./pages/signup/signup";
import ChatPage from "./pages/chat/chat";
import PrivateRoute from "./components/privateRoute";

const Layout = () => {
  // const location = useLocation();
  // const hideNavbar = ['/signin', '/signup'].includes(location.pathname);
  return (
    <div className=""> {/* there was: md:w-8/12 mx-auto */} 
      {/* <ComplexNavbar /> */}
      {/* {!hideNavbar && <ComplexNavbar />} */}
      <Outlet></Outlet>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/",
        element: <PrivateRoute />,
        children: [
          {
            path: "/",
            element: <ChatPage />,
          },
        ],
      },
    ],
  },
]);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "signin",
//         element: <Signin />,
//       },
//       {
//         path: "signup",
//         element: <Signup />,
//       },
//       {
//         path: "home",
//         element: <PrivateRoute />,
//         children: [
//           {
//             path: "", // Changed from "/" to ""
//             element: <ChatPage />,
//           },
//         ],
//       },
//     ],
//   },
// ]);



function App() {
  return (
    <div className="bg-secondaryBackgroundLight dark:bg-secondaryBackgroundDark">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
