import { Alert, AlertTitle } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiURI } from "../api/gitlabApiHelpers";
import { RepoContext } from "../App";

export interface LoginPageProps {
  tokenOnUpdateCallback: (token: string) => void;
}

const LoginPage = () => {
  const [token, setToken] = useState<string>("");
  const [repoURI, setRepoURI] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const repoContext = useContext(RepoContext);

  const navigate = useNavigate();

  const submitHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    // TODO: Validate token and repoURI
    const apiURI = getApiURI(repoURI);
    if (!apiURI) {
      setErrorMsg(
        "Invalid repository URL. Go to projects frontpage and copy the link"
      );
      return;
    }

    repoContext.setRepoData({ repoURI: apiURI, repoToken: token });

    navigate("/stats");
  };

  return (
    <>
      <div className="content login">
        {errorMsg ? (
          <Alert onClose={() => setErrorMsg("")} severity="error">
            <AlertTitle>Bad link to repo</AlertTitle>
            {errorMsg}
          </Alert>
        ) : (
          <></>
        )}
        <h1>GitLab Analyzer</h1>
        <p>Enter your repository URL and an access token to get started.</p>
        <form>
          <p className="label">Repository URL:</p>
          <input
            type="text"
            placeholder="https://gitlab.com/<username>/<repo>"
            onChange={(e) => setRepoURI(e.target.value)}
          />

          <p className="label">Access token:</p>
          <input
            type="text"
            placeholder="xxxxx-xxxxxx_xxxxxxxxx_xxx"
            onChange={(event) => setToken(event.target.value)}
          />

          <button type="submit" onClick={submitHandler}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default LoginPage;
