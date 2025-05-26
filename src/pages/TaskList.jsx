import { GlobalContext } from "../contexts/CountContext"

import { useContext } from "react"

function TaskList() {
    const { tasks } = useContext(GlobalContext)
    console.log(tasks)
    return (
        <h1>Lista Task</h1>
    )
}


export default TaskList