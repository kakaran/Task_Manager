import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AllContext } from "./Context/Context";
import routes from "./Routes/Routes";
import { useContext } from "react";

function App() {
  const { role, isSignedIn } = useContext(AllContext);

  return (
    <Router>
      <Routes>
        {routes(role, isSignedIn).map((route, index) => {
          return <Route key={index} {...route} />;
        })}
      </Routes>
    </Router>
  );
}

export default App;

// <Route path="/" element={<Login />} />

// <Route path = "/form" element={<TaskForm/>}/>
