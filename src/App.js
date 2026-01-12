import { BrowserRouter, Routes, Route } from "react-router-dom";
import Careers from "./pages/Careers";
import FinalApplicationForm from "./pages/Careers/FinalApplicationForm";
import FinalApplicationForm2 from "./pages/Careers/FinalApplicationForm2";
import FinalApplicationForm3 from "./pages/Careers/FinalApplicationForm3";
import FinalApplicationForm4 from "./pages/Careers/FinalApplicationForm4";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Careers />} />
        <Route path="/final-form" element={<FinalApplicationForm />} />
        <Route path="/final-form-2" element={<FinalApplicationForm2 />} />
        <Route path="/final-form-3" element={<FinalApplicationForm3 />} />
        <Route path="/final-form-4" element={<FinalApplicationForm4 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
