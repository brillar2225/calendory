import { createContext, useEffect, useReducer, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../api/firebase';
import Loading from '../components/ui/Loading';

const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

const initialState = {
  user: null,
};

export const AuthContext = createContext();

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return { ...state, user: payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      if (user) {
        dispatch({ type: SET_USER, payload: user });
      } else {
        dispatch({ type: REMOVE_USER, payload: null });
      }
    });
    return unsubscribe;
  }, []);

  if (isLoading) return <Loading />;
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
