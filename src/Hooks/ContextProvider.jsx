import { createContext, useState } from "react";

const ModalContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isModal, setModal] = useState(false);

  return (
    <ModalContext.Provider value={{ isModal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
