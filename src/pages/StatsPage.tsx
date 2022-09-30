import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { RepoContext } from "../App";
import GraphsComp from "../components/GraphsComp";
import { Leaderboard } from "../components/Leaderboard";
import Navbar from "../components/Navbar";
import "../styles/react-tabs.scss";

const StatsPage = () => {
  const [isLoading, setLoading] = useState(true);
  const repoContext = useContext(RepoContext);
  const navigate = useNavigate();

  const [defaultTabIndex, setDefaultTabIndex] = useState(0);

  useEffect(() => {
    if (!repoContext.repoData.repoURI || !repoContext.repoData.repoToken) {
      navigate("/");
    }

    if (sessionStorage.getItem("tabIndex")) {
      setDefaultTabIndex(Number(sessionStorage.getItem("tabIndex")));
    }

    setLoading(false);
  }, [navigate, repoContext]);

  const onChangeTab = (index: number) => {
    sessionStorage.setItem("tabIndex", index.toString());
  };

  if (isLoading) {
    return <div className="App">Loading...</div>;
  } else {
    return (
      <>
        <Navbar />

        <div className="content">
          <Tabs defaultIndex={defaultTabIndex} onSelect={onChangeTab}>
            <TabList>
              <Tab>Leaderboard</Tab>
              <Tab>Graphs</Tab>
            </TabList>

            <TabPanel>
              <h2>Leaderboard</h2>
              <Leaderboard />
            </TabPanel>

            <TabPanel>
              <h2>Graphs</h2>
              <GraphsComp />
            </TabPanel>
          </Tabs>
        </div>
      </>
    );
  }
};
export default StatsPage;
