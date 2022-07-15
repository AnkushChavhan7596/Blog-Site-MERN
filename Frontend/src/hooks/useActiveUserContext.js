import { ActiveUserContext } from "../context/activeUserContext";
import { useContext } from "react";

export const useActiveUserContext = () =>{
  const context = useContext(ActiveUserContext);

  if(!context){
    throw Error("useActiveUserContext must be inside inside ActiveUserContext");
  }

  return context;
}