import React, { createContext, useEffect, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

import { ACCOUNT_INITIALISE, LOGIN, LOGOUT } from "../store/actions";
import axios from "axios";
import accountReducer from '../store/accountReducer';
import Loader from "../components/Loader/Loader";
import { CONFIG } from "../config/constant";

const initialState = {
  isLoggedIn: false,
  isInitialised: false,
  user: null
};

const verifyToken = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }

  const decoded = jwtDecode(serviceToken);
  console.log(decoded);
  console.log((Date.now()/1000));
  return decoded.exp > (Date.now() / 1000);
};

const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const JWTContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => { },
  hasPermission: () => { },
});

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);
  /*useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);*/

  const handleUnload = (e) => {
    const message = "o/";
    (e || window.event).returnValue = message; //Gecko + IE
    window.localStorage.clear();
    return message;
  };

  const login = async (email, password) => {
    const response = await axios.post(`${CONFIG.backendURI}/users/signin`, { username: email, password });
    const { accessToken, user } = response.data;
    setSession(accessToken);
    dispatch({
      type: LOGIN,
      payload: {
        user
      }
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const hasPermission = (permission) => {
    console.log(permission);
    const { user } = state;
    console.log(user);
    if (user && user.roles.length > 0) {
      const foundPermissions = user.roles[0].permissions.filter(obj => obj.name === permission);
      console.log(foundPermissions);
      if (foundPermissions.length > 0) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          const response = await axios.get(`${CONFIG.backendURI}/users/getLoggedInUser`);
          const { user } = response.data;
          dispatch({
            type: ACCOUNT_INITIALISE,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          dispatch({
            type: ACCOUNT_INITIALISE,
            payload: {
              isLoggedIn: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: ACCOUNT_INITIALISE,
          payload: {
            isLoggedIn: false,
            user: null
          }
        });
      }
    };

    init();
  }, []);

  if (!state.isInitialised) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider value={{ ...state, login, logout, hasPermission }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
