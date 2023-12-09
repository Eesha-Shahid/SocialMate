'use client'
import { ReactNode, useState } from 'react';
import UserContext, { defaultUserContext } from '../contexts/UserContext';
import { User } from '@/types/User';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(defaultUserContext.user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
