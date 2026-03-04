import { createContext } from "react";

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {

    return (
        <GlobalContext.Provider>
            {children}
        </GlobalContext.Provider>
    )
}