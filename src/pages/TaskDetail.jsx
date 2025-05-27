import { GlobalContext } from "../contexts/CountContext";
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";


function TaskDetail() {

    const { tasks, removeTask } = useContext(GlobalContext)
    const { id } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState('');

    const task = tasks.find(t => t.id === Number(id))

    if (!task) {
        return <p>Task non trovata</p>
    }

    const handleDelete = async () => {
        try {
            await removeTask(task.id)
            alert("Task eliminata")
            navigate("/")
        } catch (error) {
            alert("Errore durante la eliminazione")
        }
    }

    return (
        <>
            <h3>Dettagli Task</h3>
            <p> Nome : {task.title}</p>
            <p> Descrizione : {task.description}</p>
            <p> Stato : {task.status}</p>
            <p> Data di creazione : {task.createdAt}</p>

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
        </>
    )
}

export default TaskDetail