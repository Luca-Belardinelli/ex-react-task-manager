// Importo NavLink da react-router-dom per la navigazione
import { NavLink } from "react-router-dom";

// Importo React per poter usare React.memo
import React from "react";

// Componente TaskRow  rappresenta una singola riga della tabella delle task
function TaskRow({ task }) {
    // Verifica se lo stato del task è "To do"
    const isToDo = task.status === "To do";
    // Verifica se lo stato del task è "Doing"
    const isDoing = task.status === "Doing";

    return (
        <>
            <tr>
                {/* Colonna con il titolo del task  che porta alla pagina del task */}
                <td >
                    <NavLink to={`/task/${task.id}`}>
                        {task.title}
                    </NavLink>
                </td>
                {/* Colonna con lo stato del task, colorato dinamicamente in base allo stato */}
                <td className={`${isToDo ? "red" : isDoing ? "yellow" : "green"}`}>{task.status} </td>
                <td>{new Date(task.createdAt).toLocaleDateString()} </td>
            </tr>
        </>
    )
}

// Memorizzo il componente per evitare render non necessari
const MemoTasks = React.memo(TaskRow)

export default MemoTasks