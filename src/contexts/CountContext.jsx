// Importo le funzionalità necessarie da React
import { createContext } from "react";
import { useState, useEffect } from "react";

// contesto globale che verrà utilizzato in tutta l'applicazione
export const GlobalContext = createContext();

// Recupero l'URL dell'API 
const api = import.meta.env.VITE_API;

// Componente Provider che fornirà il contesto a tutti i componenti figli
export const GlobalProvider = ({ children }) => {

    // stato per gestire i data
    const [tasks, setTasks] = useState([]);

    // chiamata api
    useEffect(() => {
        (async () => {
            // Effettuo la chiamata  all'API
            let data;
            try {
                const responseApi = await fetch(`${api}/tasks`)
                data = await responseApi.json();
                // Gestione degli errori durante la chiamata API
                setTasks(data)
            } catch (error) {
                console.error("Errore")
            }
        })();
    }, [])// Array di dipendenze vuoto

    // Fornisco il contesto con i valori necessari ai componenti figli
    return (
        <GlobalContext value={{ setTasks, tasks }}>
            {children}
        </GlobalContext>
    )
}