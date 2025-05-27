// Importo NavLink da react-router-dom per la navigazione
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <h1>Task Manager</h1>
            <nav className="nav-links">
                {/*  isActive determina se il link è attualmente attivo */}
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