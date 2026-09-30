import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import RealSmileAi from "./pages/RealSmileAi";
import RealSmileAiCases from "./pages/RealSmileAiCases";
import Patients from "./pages/Patients";
import AddCase from "./pages/AddCase";
import AddRetainer from "./pages/AddRetainer";
import AllCases from "./pages/AllCases";
import IncompleteSubmissions from "./pages/IncompleteSubmissions";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/realsmile-ai" element={<RealSmileAi />} />
        <Route path="/realsmile-ai-cases" element={<RealSmileAiCases />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/cases/add" element={<AddCase />} />
        <Route path="/retainers/add" element={<AddRetainer />} />
        <Route path="/cases" element={<AllCases />} />
        <Route path="/cases/incomplete" element={<IncompleteSubmissions />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
