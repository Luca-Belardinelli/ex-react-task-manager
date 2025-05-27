// Importo il contesto globale per accedere ai task
import { GlobalContext } from "../contexts/CountContext"
// Importo l'hook useContext 
import { useContext } from "react"
// importo Task row
import TaskRow from "../components/TaskRow"

function TaskList() {
    // Estraggo i task dal contesto globale usando destructuring
    const { tasks } = useContext(GlobalContext)
    console.log(tasks)
    return (
        <div className="task_list_container">
            <h1>Lista Task</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data di creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map(task =>
                            <TaskRow key={task.id} task={task} />
                        )
                    }
                </tbody>
            </table>
        </div>


    )
}


export default TaskList