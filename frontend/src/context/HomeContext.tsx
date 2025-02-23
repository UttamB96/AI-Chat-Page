import { createContext, useContext, useState } from "react";

// Home Context to pass user login state to home page
type HomeContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

// Creating the Home Context
const HomeContext = createContext<HomeContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHomeContext must be used within a HomeContextProvider");
  }
  return context;
};

//export const useHomeContext = () => useContext(HomeContext);
//export default HomeContext;

export const HomeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <HomeContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </HomeContext.Provider>
  );
};
