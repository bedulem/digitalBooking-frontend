import { createContext, useContext, useState } from 'react';

import { loadState, removeState, saveState } from '../../utils/localStorage';


const ConfigContext = createContext({});

const ConfigContextProvider = ({ children }) => {
    const localConfig = loadState('config');
    const [config, setConfig] = useState(localConfig);

    const setValue = (key, value) => {
        const newState = {...config,[key]:value}
        saveState('config', newState);
        setConfig((state)=>({...state,[key]:value}));
    };
    const setValues = (values) => {
        const newState = {...config, ...values}
        saveState('config', newState);
        setConfig(newState);
    };

    const removeValue = (key) =>{
        
        removeState(key)

    }

    return (
        <ConfigContext.Provider
            value={{
                config,
                setValue,
                setValues,
                removeValue
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
};

const useConfigContext = () => useContext(ConfigContext);

export { ConfigContextProvider, useConfigContext }
