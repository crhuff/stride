import React, { createContext, useContext, useState, ReactNode } from "react";

interface HeaderContextProps {
  backButtonVisible: boolean;
  setBackButtonVisible: (visible: boolean) => void;
}

const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);

export const HeaderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [backButtonVisible, setBackButtonVisible] = useState(false);

  return (
    <HeaderContext.Provider
      value={{
        backButtonVisible,
        setBackButtonVisible,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = (): HeaderContextProps => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
};
