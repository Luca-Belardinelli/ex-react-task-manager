import { useState, useEffect } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {

    const [editTask, setEditTask] = useState(task);

    const changeEditTask = (key, event) => {
        setEditTask(prev => ({ ...prev, [key]: event.target.value }))
    }

    return (
        <>
            <Modal
                title="Conferma Eliminazione"
                content={<span>{`Sei sicuro di voler eliminare la task ${task.title}`}</span>}
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
            />
        </>
    )
}