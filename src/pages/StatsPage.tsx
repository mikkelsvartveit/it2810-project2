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

const InfoPage = () => {
  const [isLoading, setLoading] = useState(true);
  const repoContext = useContext(RepoContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!repoContext.repoData.repoURI || !repoContext.repoData.repoToken) {
      navigate("/");
    }

    setLoading(false);
  }, [navigate, repoContext]);

  const [commits, setCommits] = useState<GitlabCommit[]>([]);
  const [mergeRequests, setMergeRequests] = useState<GitlabMergeRequest[]>([]);
  const [issues, setIssues] = useState<GitlabIssue[]>([]);

  useEffect(() => {
    if (!repoContext.repoData.repoURI || !repoContext.repoData.repoToken)
      return;
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
      const commits = await getCommits(
        repoContext.repoData.repoURI,
        repoContext.repoData.repoToken
      );
      const mergeRequests = await getMergeRequests(
        repoContext.repoData.repoURI,
        repoContext.repoData.repoToken,
        "merged"
      );
      const issues = await getIssues(
        repoContext.repoData.repoURI,
        repoContext.repoData.repoToken,
        "closed"
      );
      if (debounce) {
        setCommits(commits);
        setMergeRequests(mergeRequests);
        setIssues(issues);
      }
    }
  }, [repoContext.repoData.repoURI]);

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
        </div>
      </>
    );
  }
};
export default InfoPage;
