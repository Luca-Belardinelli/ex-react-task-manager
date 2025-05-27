import { GlobalContext } from "../contexts/CountContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";


function TaskDetail() {

    const { tasks } = useContext(GlobalContext)
    const { id } = useParams();

    const task = tasks.find(t => t.id === Number(id))

    if (!task) {
        return <p>Task non trovata</p>
    }

    return (
        <>
            <h3>Dettagli Task</h3>
            <p> Nome : {task.title}</p>
            <p> Descrizione : {task.description}</p>
            <p> Stato : {task.status}</p>
            <p> Data di creazione : {task.createdAt}</p>

            <button onClick={() => console.log("Elimino task")}>
                Elimina task
            </button>
        </>
    )
}

export default TaskDetail