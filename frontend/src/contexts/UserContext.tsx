import { User } from '@/types/User';
import { createContext, Dispatch, SetStateAction } from 'react';

export interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const defaultUserContext: UserContextType = {
  user: null,
  setUser: (user: SetStateAction<User | null>): void => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

export default UserContext;