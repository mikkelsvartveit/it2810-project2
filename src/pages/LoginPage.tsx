import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface LoginPageProps {
  tokenOnUpdateCallback: (token: string) => void;
}

const LoginPage = () => {
  const [token, setToken] = useState<string>("");

  const navigate = useNavigate();

  const tokenSubmitHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    // TODO: Validate token
    window.localStorage.setItem("token", token);
    navigate("/stats");
  };
  return (
    <div>
      <h1>GitLab repo analytics</h1>
      <p>Enter your GitLab API token to get started.</p>
      <form>
        <input
          type="text"
          placeholder="API token"
          onChange={(event) => setToken(event?.target.value)}
        />
        <button type="submit" onClick={tokenSubmitHandler}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default LoginPage;
