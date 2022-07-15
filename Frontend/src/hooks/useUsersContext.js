import { useContext } from "react"
import { UsersContext } from "../context/UserContext";

export const useUsersContext = () =>{
    const context = useContext(UsersContext);

    
    if(!context){
        throw Error("usePostsContext must be used inside an PostsContextProvider");
    }

    return context;
}