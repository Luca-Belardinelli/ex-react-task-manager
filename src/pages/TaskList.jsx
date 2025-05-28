// Importo il contesto globale per accedere ai task
import { GlobalContext } from "../contexts/CountContext"
// Importo l'hook useContext 
import { useContext, useState, useMemo } from "react"
// importo Task row
import TaskRow from "../components/TaskRow"


function TaskList() {
    // Estraggo i task dal contesto globale usando destructuring
    const { tasks } = useContext(GlobalContext)
    console.log(tasks)

    //stati per l'ordinamento
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);

    const sortIcon = sortOrder === 1 ? "↓" : "↑";

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(field);
            setSortOrder(1);
        }
    }

    const sortedTask = useMemo(() => {
        return [...tasks].sort((a, b) => {
            let comparison;
            if (sortBy === 'title') {
                comparison = a.title.localeCompare(b.title)
            } else if (sortBy === 'status') {
                const statusOptions = ['To do', "Doing", "Done"];
                comparison = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status)
            } else if (sortBy === 'createdAt') {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                comparison = dateA - dateB;
            }
            return comparison * sortOrder;
        })

    }, [tasks, sortBy, sortOrder])


    return (
        <div className="task_list_container">
            <h1>Lista Task</h1>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('title')}>Nome{sortBy === 'title' && sortIcon}</th>
                        <th onClick={() => handleSort('status')}>Stato {sortBy === 'status' && sortIcon}</th>
                        <th onClick={() => handleSort('createdAt')}>Data di creazione {sortBy === 'createdAt' && sortIcon}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedTask.map(task =>
                            <TaskRow key={task.id} task={task} />
                        )
                    }
                </tbody>
            </table>
        </div>


    )
}


export default TaskList