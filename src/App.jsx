import { Routes, Route } from "react-router-dom"

// importo le pagine
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"

// importo il default 
import DefaultLayout from "./layouts/DefaultLayout"

// importo globalprovaider
import { GlobalProvider } from "./contexts/CountContext"


function App() {

  return (
    <>
      <GlobalProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTask />} />
          </Route>
        </Routes>
      </GlobalProvider>
    </>
  )
}

export default App
