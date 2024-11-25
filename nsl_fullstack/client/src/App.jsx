import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./landingpage";
import SignTranslator from "./SignTranslator";
import Dashboard from "./Dashboard";
import LearnSignLanguage from "./LearnSignLanguage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-translator" element={<SignTranslator />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learn" element={<LearnSignLanguage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
