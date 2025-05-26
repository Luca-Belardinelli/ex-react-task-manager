
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <>
            <h1>Header</h1>
            <NavLink to="/">
                TaskList
            </NavLink>
            <NavLink to="add">
                AddTask
            </NavLink>
        </>
    )
}

export default Header