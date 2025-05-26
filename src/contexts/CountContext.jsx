import { createContext } from "react";

import { useState, useEffect } from "react";

export const GlobalContext = createContext();

const api = import.meta.env.VITE_API;

export const GlobalProvider = ({ children }) => {

    // stato per gestire i data
    const [tasks, setTasks] = useState([]);

    // chiamata api
    useEffect(() => {
        (async () => {
            let data;
            try {
                const responseApi = await fetch(`${api}/tasks`)
                data = await responseApi.json();
                setTasks(data)
            } catch (error) {
                console.error("Errore")
            }
        })();
    }, [])

    return (
        <GlobalContext value={{ setTasks, tasks }}>
            {children}
        </GlobalContext>
    )
}