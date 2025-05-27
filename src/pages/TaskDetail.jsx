// Importo il context globale per accedere a tasks e alla funzione removeTask
import { GlobalContext } from "../contexts/CountContext";
import { useContext, useState } from "react";
// Hook di React Router per ottenere parametri e navigazione
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";


function TaskDetail() {
    // Ottengo le task e la funzione per rimuoverne una dal context
    const { tasks, removeTask } = useContext(GlobalContext)
    // Ottengo l'ID della task dalla URL
    const { id } = useParams();
    // Hook per gestire la navigazione dopo l'eliminazione
    const navigate = useNavigate();
    // Stato per mostrare o nascondere il modal di conferma
    const [showModal, setShowModal] = useState('');

    // Cerco la task corrispondente all'ID
    const task = tasks.find(t => t.id === Number(id))

    // Se la task non viene trovata
    if (!task) {
        return <p>Task non trovata</p>
    }

    // Funzione che gestisce l'eliminazione effettiva della task
    const handleDelete = async () => {
        try {
            await removeTask(task.id)
            alert("Task eliminata")
            navigate("/") // Torno alla home
        } catch (error) {
            alert("Errore durante la eliminazione")
        }
    }

    return (
        <div className="task-detail">
            <h3>Dettagli Task</h3>
            <p> Nome : {task.title}</p>
            <p> Descrizione : {task.description}</p>
            <p> Stato : {task.status}</p>
            <p> Data di creazione : {new Date(task.createdAt).toLocaleDateString()}</p>

            <button onClick={() => setShowModal(true)}>
                Elimina task
            </button >


            <Modal
                title="Conferma Eliminazione"
                content={<span>{`Sei sicuro di voler eliminare la task ${task.title}`}</span>}
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                confirmText="Elimina"
            />
        </div>
    )
}

export default TaskDetail