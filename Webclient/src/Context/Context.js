import React, { useState } from 'react'

const ThemeContext = React.createContext()

export const Context = ({ children }) => {
    
    const [colors, setColors] = useState();
    
    return (
        <ThemeContext.Provider value={}>
            { children }
        </ThemeContext.Provider>
    )
}
