import React from "react";
import { Link } from "react-router-dom";
import { repoData } from "../App";
import { withNavigateHook } from "./withNavigateHook";

interface INavigationProps {
  navigate: any;
  repoContext: {
    repoData: repoData;
    setRepoData: (repoData: repoData) => void;
  };
}

class Navbar extends React.Component<INavigationProps> {
  constructor(props: any) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    this.props.repoContext.setRepoData({
      repoURI: null,
      repoToken: null,
    });
    this.props.navigate("/");
  };

  render() {
    return (
      <div className="navbar">
        <div className="navbar-content">
          <div>
            <span className="navbar-title">GitLab Analyzer</span>
          </div>
          <button onClick={this.handleLogout}>
            <Link to="/"></Link>Exit repo
          </button>
        </div>
      </div>
    );
  }
}

export default withNavigateHook(Navbar);
