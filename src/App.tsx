import LoginPage from "./pages/LoginPage";
import StatsPage from "./pages/StatsPage";
import { Routes, Route, HashRouter } from "react-router-dom";
import { createContext, useState } from "react";

export interface repoData {
  repoURI: string | null;
  repoToken: string | null;
}

const startData: repoData = {
  repoURI: localStorage.getItem("repoURI"),
  repoToken: localStorage.getItem("repoToken"),
};

export const RepoContext = createContext({
  repoData: startData,
  setRepoData: (repoData: repoData) => {},
});

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [context, setContext] = useState({
    repoData: startData,

    setRepoData: (repoData: repoData) => {
      if (repoData.repoURI && repoData.repoToken) {
        localStorage.setItem("repoURI", repoData.repoURI);
        localStorage.setItem("repoToken", repoData.repoToken);
      } else {
        localStorage.removeItem("repoURI");
        localStorage.removeItem("repoToken");
      }
      setContext({
        ...context,
        repoData: repoData,
      });
    },
  });

  return (
    <RepoContext.Provider value={context}>{children}</RepoContext.Provider>
  );
}

function App() {
  return (
    <ContextProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </HashRouter>
    </ContextProvider>
  );
}

export default App;
