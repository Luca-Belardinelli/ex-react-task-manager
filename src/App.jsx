import { Routes, Route } from "react-router-dom"

// importo le pagine
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"
import DefaultLayout from "./layouts/DefaultLayout"


function App() {

  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<AddTask />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
