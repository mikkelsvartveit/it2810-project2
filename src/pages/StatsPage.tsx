import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
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

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };

  if (isLoading) {
    return <div className="App">Loading...</div>;
  } else {
    return (
      <>
        <div className="navbar">
          <div className="navbar-container">
            <div>GitLab Analyzer</div>
            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>

        <div className="content">
          <Tabs>
            <TabList>
              <Tab>Leaderboard</Tab>
              <Tab>Graphs</Tab>
            </TabList>

            <TabPanel>
              <h2>Leaderboard</h2>
            </TabPanel>

            <TabPanel>
              <h2>Graphs</h2>
            </TabPanel>
          </Tabs>
        </div>
      </>
    );
  }
};
export default InfoPage;
