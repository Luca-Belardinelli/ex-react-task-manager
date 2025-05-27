// Importo le funzionalità necessarie da React
import { useState, useEffect } from "react";

// Recupero l'URL dell'API 
const api = import.meta.env.VITE_API;

export default function useTasks() {

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


    // Funzioni placeholder
    const addTask = async (newTask) => {
        const response = await fetch(`${api}/tasks`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        const { success, message, task } = await response.json();
        console.log(response, message, success)

        if (!success) throw new Error(message)

        setTasks(prev => [...prev, task])

    };

    const removeTask = async (taskId) => {
        const response = await fetch(`${api}/tasks/${taskId}`, {
            method: "DELETE",
        });

        const { success, message } = await response.json();

        if (!success) throw new Error(message)

        setTasks(prev => prev.filter(task => task.id !== taskId))
    };

    const updateTask = () => {
        // da implementare
    };

    return { tasks, addTask, removeTask, updateTask }
}


