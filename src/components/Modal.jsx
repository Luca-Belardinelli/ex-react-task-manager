// Importa la funzione `createPortal` da React DOM per  il portale
import { createPortal } from "react-dom";

// Componente Modal: visualizza una finestra modale 
function Modal({ title, content, show, onClose, onConfirm, confirmText = "Conferma" }) {

    // Se `show` è false, non renderizzare nulla (modale nascosta)
    if (!show) return null;

    // Se `show` è true, usa un "portal" per renderizzare la modale direttamente dentro `document.body`
    return createPortal(
        <div className="modal-backdrop">
            <div className="modal">
                {/* Titolo della modale */}
                <h2>{title}</h2>
                {/* Contenuto della modale */}
                <div className="modal-content">
                    {content}
                </div>
                {/* Pulsanti per confermare o annullare */}
                <div className="modal-buttons">
                    <button onClick={onConfirm}>{confirmText}</button>
                    <button onClick={onClose}>Annulla</button>
                </div>
            </div>
        </div>,
        // Dove verrà montata la modale nel DOM
        document.body

    )

}

export default Modal;