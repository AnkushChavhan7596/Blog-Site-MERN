import { createContext, useReducer } from "react";

export const SearchResultContext = createContext();

export const searchResultReducer = (state, action) => {
    switch (action.type) {
      case "SET_SEARCH_RESULT":
        return {
            searchResultStyle : action.payload
        };
  
      default:
        return state;
    }
  };

export const SearchResultContextProvider = ({children}) =>{

    const [state, searchResultDispatch] = useReducer(searchResultReducer, {
        searchResultStyle : "hideSearch"
    })
    
    return(
        <SearchResultContext.Provider value={{...state, searchResultDispatch}}>
            {children}
        </SearchResultContext.Provider>
    )

}