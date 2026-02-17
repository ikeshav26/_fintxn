import { createContext, useState } from "react";



const appContext=createContext()


const ContextProvider=({children})=>{
    const [user, setuser] = useState(null)
    const value={
        user,
        setuser
    }
    return(
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
    )
}

export {appContext,ContextProvider};