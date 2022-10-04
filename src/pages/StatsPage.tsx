import { CircularProgress } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import {
  GitlabCommit,
  GitlabIssue,
  GitlabMergeRequest,
} from "../api/gitlabApi";
import {
  getCommits,
  getIssues,
  getMergeRequests,
} from "../api/gitlabApiHelpers";
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
    // Redirect to front page if no repo data is available
    if (!repoContext.repoData.repoURI || !repoContext.repoData.repoToken) {
      navigate("/");
    }

    if (sessionStorage.getItem("tabIndex")) {
      setDefaultTabIndex(Number(sessionStorage.getItem("tabIndex")));
    }
  }, [navigate, repoContext]);

  const onChangeTab = (index: number) => {
    sessionStorage.setItem("tabIndex", index.toString());
  };

  const [commits, setCommits] = useState<GitlabCommit[]>([]);
  const [mergeRequests, setMergeRequests] = useState<GitlabMergeRequest[]>([]);
  const [issues, setIssues] = useState<GitlabIssue[]>([]);

  useEffect(() => {
    if (!repoContext.repoData.repoURI || !repoContext.repoData.repoToken) {
      return;
    }
    // debounce to ensure only one request is sent per page mount
    let debounce = true;
    getGitlabData();
    return () => {
      debounce = false;
    };
    async function getGitlabData() {
      if (
        !debounce ||
        !repoContext.repoData.repoURI ||
        !repoContext.repoData.repoToken
      )
        return;

      // Use Promise.all to fetch data in parallel
      const [commits, mergeRequests, issues] = await Promise.all([
        getCommits(
          repoContext.repoData.repoURI,
          repoContext.repoData.repoToken
        ),
        getMergeRequests(
          repoContext.repoData.repoURI,
          repoContext.repoData.repoToken,
          "merged"
        ),
        getIssues(
          repoContext.repoData.repoURI,
          repoContext.repoData.repoToken,
          "closed"
        ),
      ]);

      if (debounce) {
        setCommits(commits);
        setMergeRequests(mergeRequests);
        setIssues(issues);
        setLoading(false);
      }
    }
  }, [repoContext.repoData.repoURI, repoContext.repoData.repoToken]);

  return (
    <>
      <Navbar />
      <div className="content">
        {!isLoading ? (
          <Tabs defaultIndex={defaultTabIndex} onSelect={onChangeTab}>
            <TabList>
              <Tab>Leaderboard</Tab>
              <Tab>Graphs</Tab>
            </TabList>

            <TabPanel>
              <h2>Leaderboard</h2>
              <Leaderboard
                commits={commits}
                mergeRequests={mergeRequests}
                issues={issues}
              />
            </TabPanel>

            <TabPanel>
              <h2>Graphs</h2>
              <GraphsComp
                commits={commits}
                mergeRequests={mergeRequests}
                issues={issues}
              />
            </TabPanel>
          </Tabs>
        ) : (
          <div className="loading" data-testid="statspage-loading">
            <CircularProgress className="loading" size={50} />
          </div>
        )}
      </div>
    </>
  );
};

export default StatsPage;
