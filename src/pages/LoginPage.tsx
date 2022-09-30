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
    <div>
      <h1>GitLab repo analytics</h1>
      <p>Enter your GitLab API token to get started.</p>
      <form>
        <input
          type="text"
          placeholder="https://gitlab.com/"
          onChange={(e) => setRepoURI(e.target.value)}
        />
        <input
          type="text"
          placeholder="API token"
          onChange={(event) => setToken(event.target.value)}
        />
        <button type="submit" onClick={submitHandler}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default LoginPage;
