import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RepoContext } from "../App";

export const withNavigateHook = (Component: any) => {
  return (props: any) => {
    const navigate = useNavigate();
    const repoContext = useContext(RepoContext);

    return (
      <Component navigate={navigate} repoContext={repoContext} {...props} />
    );
  };
};
