import { ProfileImage, PublicUser } from '@/types/types';
import { createContext, useReducer, useEffect, useState } from 'react';
import { api } from '@/services/api';

type Action =
  | { type: 'login'; payload: PublicUser }
  | { type: 'logout' }
  | { type: 'pic-update'; payload: ProfileImage }
  | { type: 'persist'; payload: PublicUser };
type Dispatch = (action: Action) => void;
type State = { user: PublicUser | null };
type AuthProviderProps = { children: React.ReactNode };

export const AuthContext = createContext<
  { state: State; dispatch: Dispatch; isLoading: boolean } | undefined
>(undefined);

function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'login': {
      return { ...state, user: action.payload };
    }
    case 'logout': {
      return { ...state, user: null };
    }
    case 'pic-update': {
      const newUser = {
        ...state.user,
        profileImg: action.payload,
      } as PublicUser;
      return { ...state, user: newUser };
    }
    case 'persist': {
      return { ...state, user: action.payload };
    }
    default: {
      throw new Error('Unhandled action type');
    }
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [isLoading, setIsLoading] = useState(true);

  // check if a session exists, persist if success;
  useEffect(() => {
    let mounted = true;
    const getAuthUser = async () => {
      try {
        const res = await api.get('/auth/session');
        dispatch({ type: 'persist', payload: res.data });
      } catch (error) {
        console.log(error);
      } finally {
        mounted && setIsLoading(false);
      }
    };
    getAuthUser();
    return () => {
      mounted = false;
    };
  }, []);

  const value = { state, dispatch, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };

// import { PublicUser } from '@/types/types';
// import { createContext, useReducer, useEffect } from 'react';

// type Action =
//   | { type: 'login'; payload: PublicUser }
//   | { type: 'logout' }
//   | { type: 'pic-update'; payload: string };
// //  | { type: 'update'; payload: PublicUser };
// type Dispatch = (action: Action) => void;
// type State = { user: PublicUser | null };
// type AuthProviderProps = { children: React.ReactNode };

// const initialState: State = {
//   user: localStorage.getItem('user')
//     ? JSON.parse(localStorage.getItem('user') || '')
//     : null,
// };

// export const AuthContext = createContext<
//   { state: State; dispatch: Dispatch } | undefined
// >(undefined);

// function authReducer(state: State, action: Action): State {
//   switch (action.type) {
//     case 'login': {
//       // localStorage.setItem('user', JSON.stringify(action.payload));
//       return { ...state, user: action.payload };
//     }
//     case 'logout': {
//       // localStorage.removeItem('user');
//       return { ...state, user: null };
//     }
//     case 'pic-update': {
//       const newUser = {
//         ...state.user,
//         profileImg: action.payload,
//       } as PublicUser;
//       // localStorage.setItem('user', JSON.stringify({ ...state, user: newUser }));
//       return { ...state, user: newUser };
//     }
//     default: {
//       throw new Error('Unhandled action type');
//     }
//   }
// }

// function AuthProvider({ children }: AuthProviderProps) {
//   const [state, dispatch] = useReducer(authReducer, initialState);
//   const value = { state, dispatch };

//   useEffect(() => {
//     if (state.user) localStorage.setItem('user', JSON.stringify(state.user));
//     else localStorage.removeItem('user');
//   }, [state.user]);
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }
