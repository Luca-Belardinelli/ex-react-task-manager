import { createPortal } from "react-dom";

function Modal({ title, content, show, onClose, onConfirm, confirmText = "Conferma" }) {

    if (!show) return null;

    return createPortal(
        <div>
            <h2>{title}</h2>
            <p>{content}</p>
            <div>
                <button onClick={onConfirm}>{confirmText}</button>
                <button onClick={onClose}>Annulla</button>
            </div>
        </div>,

        document.body

    )

}

export default Modal;