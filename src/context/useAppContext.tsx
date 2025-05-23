import { useContext } from "react";
import { AppContext } from "./appContext";

//custom hook to access AppContext
const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default useAppContext;
