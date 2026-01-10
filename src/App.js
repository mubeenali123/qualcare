import { BrowserRouter, Routes, Route } from "react-router-dom";
import Careers from "./pages/Careers";
import FinalApplicationForm from "./pages/Careers/FinalApplicationForm";
import FinalApplicationForm2 from "./pages/Careers/FinalApplicationForm2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Careers />} />
        <Route path="/final-form" element={<FinalApplicationForm />} />
        <Route path="/final-form-2" element={<FinalApplicationForm2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
