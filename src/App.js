import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import TaskForm from "./Pages/Form/TaskForm";
function App() {
  return (
    <Router>
      <Routes>
      <Route path = "/" element={<Login/>}/>
      <Route path = "/form" element={<TaskForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
