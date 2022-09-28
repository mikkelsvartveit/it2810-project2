import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import GraphsComp from "../components/GraphsComp";
import { Leaderboard } from "../components/Leaderboard";
import Navbar from "../components/Navbar";
import "../styles/react-tabs.scss";

const InfoPage = () => {
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const repoToken = window.localStorage.getItem("token");

    if (!repoToken) {
      navigate("/");
    }

    setLoading(false);
  }, [navigate]);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  } else {
    return (
      <>
        <Navbar />

        <div className="content">
          <Tabs>
            <TabList>
              <Tab>Leaderboard</Tab>
              <Tab>Graphs</Tab>
            </TabList>

            <TabPanel>
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
export default InfoPage;
