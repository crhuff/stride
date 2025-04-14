import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../../components/Header/Header";
import Home from "../Home/Home";

function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/div" element={<div />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
