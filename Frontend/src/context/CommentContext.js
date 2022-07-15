import  { createContext, useReducer } from "react";

export const CommentsContext = createContext();

export const commentsReducer = (state, action) =>{

    switch(action.type){
        case "SET_COMMENTS":
            return{
                comments : action.payload
            }

        case "ADD_COMMENT" :
                return{
                 comments : [...state.comments, action.payload]
                }
            
        case "DELETE_COMMENT":
            return{
                comments : state.comments.filter((comment)=> comment._id !== action.payload._id)
            }

        default : 
            return state
    }

}

export const CommentsContextProvider = ({ children }) => {

    const [state, dispatchComments] = useReducer(commentsReducer, {
        comments : null
    })


    return (
        <CommentsContext.Provider value={{...state, dispatchComments}}>
            { children }
        </CommentsContext.Provider>
    )
}

