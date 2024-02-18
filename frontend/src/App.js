function App() {
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
