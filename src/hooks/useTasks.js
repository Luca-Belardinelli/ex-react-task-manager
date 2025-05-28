// Importo le funzionalità necessarie da React
import { useState, useEffect } from "react";

// Recupero l'URL dell'API 
const api = import.meta.env.VITE_API;

export default function useTasks() {

    // stato per gestire l'elenco dei task
    const [tasks, setTasks] = useState([]);

    // chiamata api
    useEffect(() => {
        (async () => {
            // Effettuo la chiamata  all'API
            let data;
            try {
                const responseApi = await fetch(`${api}/tasks`)
                data = await responseApi.json();
                // Aggiorno lo stato con i task ricevuti
                setTasks(data)
            } catch (error) {
                // Gestione degli errori durante la chiamata API
                console.error("Errore")
            }
        })();
    }, [])// Array di dipendenze vuoto


    // Funzioni placeholder
    const addTask = async (newTask) => {
        const response = await fetch(`${api}/tasks`, {
            //oggetto di configurazione
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });
        // Estraggo i dati dalla risposta
        const { success, message, task } = await response.json();
        console.log(response, message, success)
        // Se l'API restituisce un errore
        if (!success) throw new Error(message)
        // Aggiungo il nuovo task allo stato attuale
        setTasks(prev => [...prev, task])

    };

    // Funzione per rimuovere un task dato il suo ID
    const removeTask = async (taskId) => {
        const response = await fetch(`${api}/tasks/${taskId}`, {
            method: "DELETE",
        });

        const { success, message } = await response.json();

        if (!success) throw new Error(message)
        // Rimuovo il task corrispondente dallo stato
        setTasks(prev => prev.filter(task => task.id !== taskId))
    };

    // Funzione per modificare un task 
    const updateTask = async (updateTask) => {
        const response = await fetch(`${api}/tasks/${updateTask.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateTask)
        });

        const { success, message, task: newTask } = await response.json();
        if (!success) throw new Error(message)
        // per ogni task controlliamo se l'id è uguale alla task ritornata mi ritorno new task sennò la old
        setTasks(prev => prev.map(oldTask => oldTask.id === newTask.id ? newTask : oldTask));

    };

    return { tasks, addTask, removeTask, updateTask }
}


