import { GlobalContext } from "../contexts/CountContext";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";



function TaskDetail() {

    const { tasks, removeTask } = useContext(GlobalContext)
    const { id } = useParams();
    const navigate = useNavigate();

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

            <button onClick={handleDelete}>
                Elimina task
            </button>
        </>
    )
}

export default TaskDetail