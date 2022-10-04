import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiURI, validateToken } from "../api/gitlabApiHelpers";
import { RepoContext } from "../App";

export interface LoginPageProps {
  tokenOnUpdateCallback: (token: string) => void;
}

const LoginPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [token, setToken] = useState<string>("");
  const [repoURI, setRepoURI] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const repoContext = useContext(RepoContext);

  const navigate = useNavigate();

  const submitHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    // TODO: Validate token and repoURI
    const apiURI = getApiURI(repoURI);
    if (!apiURI) {
      setErrorMsg(
        "Invalid repository URL. Please make sure you have entered a valid GitLab repository URL."
      );
      return;
    }

    setErrorMsg("");
    setLoading(true);
    const valid = await validateToken(apiURI, token);
    setLoading(false);

    if (!valid) {
      setErrorMsg(
        "Authorization failed. Make sure your access token is valid."
      );

      return;
    }

    repoContext.setRepoData({ repoURI: apiURI, repoToken: token });

    navigate("/stats");
  };

  return (
    <>
      <div className="content login">
        <h1>GitLab Analyzer</h1>

        {errorMsg && (
          <Alert onClose={() => setErrorMsg("")} severity="error">
            <AlertTitle>An error occured!</AlertTitle>
            {errorMsg}
          </Alert>
        )}

        {isLoading ? (
          <div className="loading">
            <CircularProgress />
          </div>
        ) : (
          <>
            <p>Enter your repository URL and an access token to get started.</p>
            <form>
              <p className="label">Repository URL:</p>
              <input
                type="text"
                placeholder="https://gitlab.com/<username>/<repo>"
                value={repoURI}
                onChange={(e) => setRepoURI(e.target.value)}
              />

              <p className="label">Access token:</p>
              <input
                type="password"
                placeholder="xxxxx-xxxxxx_xxxxxxxxx_xxx"
                value={token}
                onChange={(event) => setToken(event.target.value)}
              />

              <button type="submit" onClick={submitHandler}>
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};
export default LoginPage;
