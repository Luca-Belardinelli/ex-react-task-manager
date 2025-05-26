
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <h1>Task Manager</h1>
            <nav className="nav-links">
                <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                    TaskList
                </NavLink>
                <NavLink to="add" className={({ isActive }) => isActive ? "active" : ""}>
                    AddTask
                </NavLink>
            </nav>
        </header>
    )
}

export default Header