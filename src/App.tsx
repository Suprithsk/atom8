
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import BackendValidation from './pages/BackendValidation';
import CloudValidation from './pages/CloudValidation';
import ConceptValidation from './pages/ConceptValidation';
import PythonBasedValidation from './pages/PythonBasedValidation';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/java-validation" element={<BackendValidation />} />
          <Route path="/cloud-validation" element={<CloudValidation />} />
          <Route path="/concept-based-validation" element={<ConceptValidation />} />
          <Route path="/python-based-validations" element={<PythonBasedValidation />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
