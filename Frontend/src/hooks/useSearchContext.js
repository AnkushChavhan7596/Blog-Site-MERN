import { SearchResultContext } from "../context/SearchResultContext";
import { useContext } from "react";

export const useSearchResultContext = () =>{
 
    const context = useContext(SearchResultContext);

    
    if(!context){
        throw Error("useSearchResultContext must be used inside an SearchResultContext");
    }

    return context;
}