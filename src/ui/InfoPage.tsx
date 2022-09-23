import React, { useState } from "react";
import { useEffect } from "react";

const InfoPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const repoToken = window.localStorage.getItem("token");
    setCategory(window.sessionStorage.getItem("category") || "");

    if (!repoToken) {
      window.location.href = "/";
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.location.href = "/";
  };
  const nextCategory = (category: string) => {
    setCategory(category);
    window.sessionStorage.setItem("category", category);
  };

  const InfoContent = () => (
    <div>
      <h1>Repo Name</h1>
      <p>Repo Description</p>
      <p>Repo URL</p>
      <p>Repo Language</p>
      <p>Repo Size</p>
      <p>Repo Stars</p>
      <p>Repo Forks</p>
      <p>Repo Issues</p>
      <p>Repo Last Commit</p>

      <button onClick={() => nextCategory("issues")}>issues</button>
      <button onClick={() => nextCategory("commits")}>commits</button>
      <button onClick={() => nextCategory("merge")}>PRs</button>
      <p>{category}</p>

      <button onClick={handleLogout}>Log out</button>
    </div>
  );

  if (isLoading) {
    return <div className="App">Loading...</div>;
  } else {
    return <InfoContent />;
  }
};
export default InfoPage;
