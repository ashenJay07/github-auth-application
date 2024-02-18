import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);
  }, []);

  const loginWithGitHub = () => {
    const {
      REACT_APP_GITHUB_AUTH_URL: URL,
      REACT_APP_GITHUB_CLIENT_ID: CLIENT_ID,
    } = process.env;

    window.location.assign(URL + CLIENT_ID);
  };

  return (
    <div className="app">
      <button onClick={loginWithGitHub}>Login with GitHub</button>
    </div>
  );
}

export default App;
