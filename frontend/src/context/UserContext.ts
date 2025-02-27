import React, { useMemo, createContext, useState } from "react";
import { UserData } from "types";

interface UserContextType {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

interface Props {
  children: React.ReactNode;
}
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
});

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserData | null>(null);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  return React.createElement(
    UserContext.Provider,
    { value: providerUser },
    children
  );
};
