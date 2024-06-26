import { createContext, useEffect, useReducer } from "react";

const INITAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading : false,
    error: null,
};

export const AuthContext = createContext(INITAL_STATE);

const AuthReducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START":
            return {
                user: null,
                loading : true,
                error: null,
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading : false,
                error: null,
            }
        case "LOGIN_FAIL":
            return {
                user: null,
                loading : false,
                error: action.payload,
            }

        case "REGISTER_START":
            return {
                user: null,
                loading: true,
                error: null,
            };
        case "REGISTER_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
        case "REGISTER_FAIL":
            return {
                user: null,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    };
};

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])
    
    return(
        <AuthContext.Provider value={{user: state.user, loading: state.loading, error: state.error, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
