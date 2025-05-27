// Importo gli hook
import { useState, useRef, useMemo } from "react";

// Importo il context globale che contiene la funzione `addTask`
import { GlobalContext } from "../contexts/CountContext";
import { useContext } from "react";


// Costanti per la validazione dei campi
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

function AddTask() {

    // stati per il form
    // input controllato
    const [title, setTitle] = useState('');
    // input non controllato
    const description = useRef();
    const status = useRef();

    // Accedo alla funzione `addTask` dal context globale
    const { addTask } = useContext(GlobalContext)

    // validazione titolo
    const notValidTitle = useMemo(() => {
        // Controllo se il titolo è vuoto o contiene solo spazi
        if (!title.trim()) {
            return "Errore : Il titolo non può essere vuoto"
        }
        // Controllo se il titolo contiene simboli speciali
        if ([...title].some(c => symbols.includes(c))) {
            return "Errore : Il titolo non può contenere caratteri speciali"
        }
        // Se tutto è valido, non ritorna nulla
    }, [title])



    // funzione che gestisce l'invio del form
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Se il titolo non è valido, interrompo il submit
        if (notValidTitle) return
        // Creo il nuovo oggetto task con i valori del form
        const newTask = {
            title: title.trim(),
            description: description.current.value,
            status: status.current.value
        }
        // console.log(newTask)
        try {
            // Invio la nuova task tramite la funzione del context
            await addTask(newTask)
            // resetto il form
            alert("la task è stata creata")
            setTitle("")
            description.current.value = ""
            status.current.value = "To do"
        } catch (error) {
            console.log(error)
            alert(" errore")
        }
    }



    return (
        <>
            <h1>Aggiungi la tua Task...</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <section className="form-section">
                        <p>Inserisci il titolo</p>
                        <input type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="aggiungi il titolo..."
                        />
                    </section>

                    {notValidTitle && (
                        <p className="error-message">{notValidTitle}</p>
                    )}

                    <section className="form-section">
                        <p>Inserisci la descrizione</p>
                        <input type="text-area"
                            ref={description}
                            placeholder="aggiungi la descrizione..."
                        />
                    </section>

                    <section className="form-section">
                        <p>Setta lo stato della task</p>
                        <select ref={status} defaultValue={"To do"}>
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </section>

                    <button type="submit" className="submit-button">Aggiungi</button>
                </form>
            </div>
        </>
    )
}


export default AddTask