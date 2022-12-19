import { createContext, useContext, useState } from 'react';

import { loadState, removeState, saveState } from '../../utils/localStorage';


const SessionContext = createContext({});

const SessionContextProvider = ({ children }) => {
    const localSesion = loadState('session');
    const [session, setSession] = useState(localSesion);

    const login = (data) => {
        saveState('session', data);
        setSession(data);
    };

    const register = (data) => {
        saveState('session', data);
        setSession(data);
    };

    const logout = () => {
        removeState('session');
        setSession(undefined);
    };

    return (
        <SessionContext.Provider
            value={{
                session,
                login,
                logout,
                register
            }}
        >
            {children}
        </SessionContext.Provider>
    );
};

const useSessionContext = () => useContext(SessionContext);

export { SessionContextProvider, useSessionContext }
