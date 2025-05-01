import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Student from "./views/student";
import Registrar from "./views/registrar";
import Metrobank from "./views/metrobank";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Main routes */}
          <Route path="/student/*" element={<Student />} />
          <Route path="/registrar/*" element={<Registrar />} />
          <Route path="/metrobank/*" element={<Metrobank />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
