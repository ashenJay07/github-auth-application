import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");

    if (codeParam && localStorage.getItem("accessToken") === null) {
      const getAccessToken = async () => {
        await fetch("http://localhost:8000/getAccessToken?code=" + codeParam, {
          method: "GET",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              setRerender(!rerender); // Rerender application after access token store in the local storage
            }
          });
      };
      getAccessToken();
    }
  }, [rerender]);

  const getUserData = async () => {
    await fetch("http://localhost:8000/getUserData", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"), // Bearer AccessToken
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const { login, url, avatar_url: avatarUrl } = data;
        setUserData({
          login,
          url,
          avatarUrl,
        });
      });
  };

  const loginWithGitHub = () => {
    const {
      REACT_APP_GITHUB_AUTH_URL: URL,
      REACT_APP_GITHUB_CLIENT_ID: CLIENT_ID,
    } = process.env;

    window.location.assign(URL + CLIENT_ID);
  };

  return (
    <div className="app">
      {localStorage.getItem("accessToken") ? (
        <>
          <button onClick={getUserData}>Get User Details</button>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              setRerender(!rerender);
            }}
          >
            Logout
          </button>

          {Object.keys(userData).length && (
            <section className="user user__container">
              <span className="user user__name">{userData.login}</span>
              <span className="user user__url">{userData.url}</span>
              <img
                src={userData.avatarUrl}
                alt="profile avatar"
                className="user user__avatar"
              />
            </section>
          )}
        </>
      ) : (
        <>
          <button onClick={loginWithGitHub}>Login with GitHub</button>
        </>
      )}
    </div>
  );
}

export default App;
