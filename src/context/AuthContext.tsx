import axios from "axios";
import React, { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    // const login = (phone_number, password) => {
        
    //     axios.post('https://icc-kidsgbigama.nyuuk.my.id/api/method/kidsgbigama_api.api.auth.api.login',{

    //     })
    // }

    return(
        <AuthContext.Provider value >{children}</AuthContext.Provider>
    );
};
