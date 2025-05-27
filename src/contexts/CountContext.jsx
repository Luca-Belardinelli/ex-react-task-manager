// Importo le funzionalità necessarie da React
import { createContext } from "react";
import useTasks from '../hooks/useTasks';


// contesto globale che verrà utilizzato in tutta l'applicazione
export const GlobalContext = createContext();


// Componente Provider che fornirà il contesto a tutti i componenti figli
export const GlobalProvider = ({ children }) => {

    const taskData = useTasks();

    // Fornisco il contesto con i valori necessari ai componenti figli
    return (
        <GlobalContext.Provider value={{ ...taskData }}>
            {children}
        </GlobalContext.Provider>
    )
}