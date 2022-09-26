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
