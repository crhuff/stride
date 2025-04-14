import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../components/Header/Header";
import Home from "./Home/Home";
import Patients from "./Patient/Patients";
import Appointments from "./Appointment/Appointments";
import AppointmentCreate from "./Appointment/create/AppointmentCreate";

function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/patients" element={<Patients />} />
            <Route
              path="/appointments/create"
              element={<AppointmentCreate />}
            />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
