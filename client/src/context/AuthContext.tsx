import { PublicUser } from '@/types/types';
import { createContext, useReducer } from 'react';

type Action = { type: 'login'; payload: PublicUser } | { type: 'logout' };
//  | { type: 'update'; payload: PublicUser };
type Dispatch = (action: Action) => void;
type State = { user: PublicUser | null };
type AuthProviderProps = { children: React.ReactNode };

const initialState: State = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '')
    : null,
};

export const AuthContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'login': {
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    }
    case 'logout': {
      localStorage.removeItem('user');
      return { ...state, user: null };
    }
    default: {
      throw new Error('Unhandled action type');
    }
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
