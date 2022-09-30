import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RepoContext } from "../App";

export interface LoginPageProps {
  tokenOnUpdateCallback: (token: string) => void;
}

const LoginPage = () => {
  const [token, setToken] = useState<string>("");
  const [repoURI, setRepoURI] = useState<string>("");
  const repoContext = useContext(RepoContext);

  const navigate = useNavigate();

  const submitHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    // TODO: Validate token and repoURI
    repoContext.setRepoData({ repoURI: repoURI, repoToken: token });

    navigate("/stats");
  };

  return (
    <>
      <div className="content login">
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
