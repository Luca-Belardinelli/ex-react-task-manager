// Importo il contesto globale per accedere ai task
import { GlobalContext } from "../contexts/CountContext"
// Importo l'hook useContext 
import { useContext, useState, useMemo, useCallback } from "react"
// importo Task row
import TaskRow from "../components/TaskRow"

// funzione debounce generica
function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);

        }, delay)
    }
}


function TaskList() {
    // Estraggo i task dal contesto globale usando destructuring
    const { tasks } = useContext(GlobalContext)
    console.log(tasks)

    const [searchQuery, setSearchQuery] = useState('')
    const debounceSearch = useCallback(debounce(setSearchQuery, 500), [])

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

    // Memoizzazione della lista filtrata e ordinata delle task
    const filteredAndSortedTask = useMemo(() => {
        //Copia l'array originale per evitare mutazioni
        return [...tasks]
            //Filtra le task in base al valore di ricerca
            .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
            // Ordina le task in base al criterio selezionato
            .sort((a, b) => {
                let comparison;

                if (sortBy === 'title') {
                    // Confronta alfabeticamente i titoli
                    comparison = a.title.localeCompare(b.title)
                } else if (sortBy === 'status') {
                    // Ordina in base all'ordine logico dello stato
                    const statusOptions = ['To do', "Doing", "Done"];
                    comparison = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status)
                } else if (sortBy === 'createdAt') {
                    // Ordina in base alla data di creazione
                    const dateA = new Date(a.createdAt).getTime();
                    const dateB = new Date(b.createdAt).getTime();
                    comparison = dateA - dateB;
                }
                // Applica l'ordinamento crescente o decrescente in base a sortOrder
                return comparison * sortOrder;
            })

        // Questa funzione viene ricalcolata solo se uno di questi valori cambia
    }, [tasks, sortBy, sortOrder, searchQuery])


    return (
        <div className="task_list_container">
            <h1>Lista Task</h1>

            {/* input di ricerca */}
            <input
                type="text"
                placeholder="text"
                onChange={e => debounceSearch(e.target.value)}
            />


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
                        filteredAndSortedTask.map(task =>
                            <TaskRow key={task.id} task={task} />
                        )
                    }
                </tbody>
            </table>
        </div>


    )
}


export default TaskList