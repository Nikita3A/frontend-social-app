import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import axios from "axios";
import { loginSuccess, updateTokens } from "../redux/userSlice";


const PrivateRoute = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user.currentUser);
  const [hasRequested, setHasRequested] = useState(false);
  const dispatch = useDispatch();

  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp < Date.now() / 1000;
    } catch {
      return true;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (!hasRequested && (!currentUser || !currentUser.accessToken || isTokenExpired(currentUser.accessToken))) {
        const res = await axios.post("/api/auth/refresh", {}, { headers: { 'Authorization': `Bearer ${currentUser.refreshToken}` }} );
        if (res.data && res.data.accessToken) {
          // Dispatch the loginSuccess action to update the accessToken in the Redux store
          dispatch(updateTokens({accessToken: res.data.accessToken, refreshToken: currentUser.refreshToken}));
        } else if (!currentUser || !currentUser.refreshToken || isTokenExpired(currentUser.refreshToken)) {
          navigate('/signin');
        }
      }
    };
    
    checkAuth();
    setHasRequested(true);
  }, [currentUser, hasRequested, navigate]);

  return <Outlet />;
};

export default PrivateRoute;
