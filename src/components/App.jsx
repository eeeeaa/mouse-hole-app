import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { AppContext } from "../utils/contextProvider";
import { ToastContainer } from "react-toastify";
import { notify } from "./common/toastProvider";
import "react-toastify/dist/ReactToastify.css";
import "../styles/App.css";

import ErrorPage from "./common/error";
import Home from "./routes/home";
import Sidebar from "./common/sidebar";
import TopBar from "./common/topbar";

import Login from "./routes/login";
import ProfilePage from "./routes/user/profile";
import MyProfile from "./routes/user/myProfile";
import MyFollowings from "./routes/myfollowings";
import PostPage from "./routes/post";
import CreatePost from "./routes/createPost";
import MyPosts from "./routes/myPosts";
import EditPost from "./routes/editPost";

function Auth() {
  return (
    <div>
      <Outlet />
      <ToastContainer limit={3} />
    </div>
  );
}

function Root() {
  const navigate = useNavigate();
  const { cookies } = useContext(AppContext);

  useEffect(() => {
    if (cookies["token"] === undefined) {
      navigate("/auth/signup");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (cookies["token"] === undefined) {
    return <div></div>;
  }

  return (
    <div>
      <div className="content">
        <div className="sidebar-layout">
          <div className="box">
            <Sidebar />
          </div>
        </div>
        <div className="topbar-layout">
          <div className="box">
            <TopBar />
          </div>
        </div>
        <div className="container">
          <div className="box">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <ToastContainer limit={3} />
    </div>
  );
}

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [displayName, setDisplayName] = useState(
    localStorage.getItem("display_name")
  );
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [profileImageUrl, setProfileImageUrl] = useState(
    localStorage.getItem("profile_url")
  );

  const [myFeeds, setMyFeeds] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const getCurrentUser = () => {
    return {
      username: username,
      display_name: displayName,
      user_id: userId,
      profile_url: profileImageUrl,
    };
  };

  const setCurrentUser = ({ username, display_name, user_id, profile_url }) => {
    localStorage.setItem("username", username);
    localStorage.setItem("display_name", display_name);
    localStorage.setItem("user_id", user_id);
    localStorage.setItem("profile_url", profile_url);

    setUsername(localStorage.getItem("username"));
    setDisplayName(localStorage.getItem("display_name"));
    setUserId(localStorage.getItem("user_id"));
    setProfileImageUrl(localStorage.getItem("profile_url"));
  };

  const removeCurrentUser = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("display_name");
    localStorage.removeItem("user_id");
    localStorage.removeItem("profile_url");

    setUsername("");
    setDisplayName("");
    setUserId("");
    setProfileImageUrl("");
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AppContext.Provider
          value={{
            cookies,
            setCookie,
            removeCookie,
            getCurrentUser,
            setCurrentUser,
            removeCurrentUser,
            myFeeds,
            setMyFeeds,
            allPosts,
            setAllPosts,
            notify,
          }}
        >
          <Root />
        </AppContext.Provider>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home isAll={false} />,
        },
        {
          path: "/all",
          element: <Home isAll={true} />,
        },
        {
          path: "/my-profile",
          element: <MyProfile />,
        },
        {
          path: "/users/:userId",
          element: <ProfilePage />,
        },
        {
          path: "/my-followings",
          element: <MyFollowings />,
        },
        {
          path: "/posts/:postId",
          element: <PostPage />,
        },
        {
          path: "/create-post",
          element: <CreatePost />,
        },
        {
          path: "/my-posts",
          element: <MyPosts />,
        },
        {
          path: "/posts/:postId/edit",
          element: <EditPost />,
        },
      ],
    },
    {
      path: "/auth",
      element: (
        <AppContext.Provider
          value={{
            cookies,
            setCookie,
            removeCookie,
            getCurrentUser,
            setCurrentUser,
            removeCurrentUser,
            notify,
          }}
        >
          <Auth />
        </AppContext.Provider>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/auth/login",
          element: <Login isSignup={false} />,
        },
        {
          path: "/auth/signup",
          element: <Login isSignup={true} />,
        },
      ],
    },
    {
      path: "/error",
      element: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
