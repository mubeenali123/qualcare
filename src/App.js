import { BrowserRouter, Routes, Route } from "react-router-dom";
import Careers from "./pages/Careers";
import FinalApplicationForm from "./pages/Careers/FinalApplicationForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Careers />} />
        <Route path="/final-form" element={<FinalApplicationForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
