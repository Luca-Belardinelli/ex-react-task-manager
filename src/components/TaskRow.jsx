
import React from "react";

function TaskRow({ task }) {

    const isToDo = task.status === "To do";
    const isDoing = task.status === "Doing";

    return (
        <>
            <tr>
                <td>{task.title} </td>
                <td className={`${isToDo ? "red" : isDoing ? "yellow" : "green"}`}>{task.status} </td>
                <td>{new Date(task.createdAt).toLocaleDateString()} </td>
            </tr>
        </>
    )
}

// Memorizzo il componente per evitare render non necessari
const MemoTasks = React.memo(TaskRow)

export default MemoTasks