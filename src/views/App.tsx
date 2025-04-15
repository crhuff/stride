import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../components/Header/Header";
import Home from "./Home/Home";
import Patients from "./Patient/Patients";
import AppointmentCreate from "./Appointment/create/AppointmentCreate";
import AppointmentDetail from "./Appointment/AppointmentDetail";
import PatientDetail from "./Patient/PatientDetail/PatientDetail";
import CacheProvider from "../utils/fetcher/cache";

function App() {
  return (
    <CacheProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/patients" element={<Patients />} />
            <Route
              path="/patients/:id/appointments/:appointmentId"
              element={<AppointmentDetail />}
            />
            <Route path="/patients/:id" element={<PatientDetail />} />
            <Route
              path="/appointments/create"
              element={<AppointmentCreate />}
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </CacheProvider>
  );
}

export default App;
