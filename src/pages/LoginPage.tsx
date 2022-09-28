import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface LoginPageProps {
  tokenOnUpdateCallback: (token: string) => void;
}

const LoginPage = () => {
  const [token, setToken] = useState<string>("");
  const [repoURI, setRepoURI] = useState<string>("");

  const navigate = useNavigate();

  const submitHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    // TODO: Validate token and repoURI

    window.localStorage.setItem("token", token);
    window.localStorage.setItem("repoURI", repoURI);
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
