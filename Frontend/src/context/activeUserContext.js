import  { createContext, useReducer } from "react";

export const ActiveUserContext = createContext();

export const activeUserReducer = (state, action) =>{

    switch(action.type){

        case "GET_ACTIVE_USER":
            return{
                activeUser : action.payload
            }

        default : {
            return state
        }
    }
}

export const ActiveUserContextProvider = ({ children }) => {

    const [state, dispatchActiceUser] = useReducer(activeUserReducer, {
        activeUser : null
    });

    return (
        <ActiveUserContext.Provider value={{...state, dispatchActiceUser}}>
            { children }
        </ActiveUserContext.Provider>
    )

}