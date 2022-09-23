import LoginPage from "./pages/LoginPage";
import StatsPage from "./pages/StatsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/info" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
