import LoginPage from "./pages/LoginPage";
import StatsPage from "./pages/StatsPage";
import { Routes, Route, HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
