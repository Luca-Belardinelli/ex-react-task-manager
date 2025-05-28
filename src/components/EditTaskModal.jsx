import { useState, useRef } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {

    // Stato locale per mantenere i dati del task in fase di modifica
    const [editTask, setEditTask] = useState(task);

    // Funzione che aggiorna lo stato `editTask` quando un campo del form cambia
    const changeEditTask = (key, event) => {
        setEditTask(prev => ({ ...prev, [key]: event.target.value }))
    }

    // destrutturo
    const { title, description, status } = editTask;
    // Ref al form per poterlo inviare manualmente
    const editFormRef = useRef();

    // funzione che gestisce l'invio del form
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("EditTask inviata:", editTask);
        onSave(editTask);
    }

    return (
        <>
            <Modal
                title="Conferma Eliminazione"
                content={
                    <form ref={editFormRef} onSubmit={handleSubmit}>
                        <section>
                            <p>Nome Task:</p>
                            <input
                                type="text"
                                value={title}
                                onChange={e => changeEditTask('title', e)}
                            />
                        </section>
                        <section>
                            <p>Descrizione:</p>
                            <input
                                type="text"
                                value={description}
                                onChange={e => changeEditTask('description', e)}
                            />
                        </section>
                        <section>
                            <p>Stato:</p>
                            <select
                                value={status}
                                onChange={e => changeEditTask('status', e)}
                            >
                                <option value="To do">To do</option>
                                <option value="Doing">Doing</option>
                                <option value="Done">Done</option>
                            </select>
                        </section>

                    </form>
                }
                confirmText="Salva"
                show={show}
                onClose={onClose}
                onConfirm={() => editFormRef.current.requestSubmit()}
            />
        </>
    )
}