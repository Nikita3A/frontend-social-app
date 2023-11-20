import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";

import "./App.css";
import Signin from "./pages/signin/signin";
import Signup from "./pages/signup/signup";
import ChatPage from "./pages/chat/chat";
import { useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Layout = () => {
  const location = useLocation();
  const hideNavbar = ['/signin', '/signup'].includes(location.pathname);
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
        path: "/chats",
        element: <ChatPage />,
      },
      // {
      //   path: "/signout",
      //   element: <Signin />,
      // },
    ],
  },
]);

const isAccessTokenExpired = (accessToken) => {
  const decodedToken = jwtDecode(accessToken);
  return decodedToken.exp < Date.now() / 1000;
};

async function refreshAccessToken() {
  // Make a request to the authentication server to refresh the access token
  const response = await axios.post('/v1/auth/refreshToken');
  return response.data.accessToken;
}


function App() {
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        if (error.response && error.response.status === 401) {
          // Retry the request with the refreshed access token
          error.config.headers['Authorization'] = `Bearer ${await refreshAccessToken()}`;
          return axios(error.config);
        }
        return Promise.reject(error);
      }
    );
    // Clean up the interceptor when the component unmounts
    // return () => {
    //   axios.interceptors.response.eject(responseInterceptor);
    // };
  }, []);


  return (
    <div className="bg-secondaryBackgroundLight dark:bg-secondaryBackgroundDark">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
