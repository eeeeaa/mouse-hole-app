import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { AppContext } from "../utils/contextProvider";
import "../styles/App.css";

import ErrorPage from "./common/error";
import Home from "./routes/home";
import Sidebar from "./common/sidebar";
import TopBar from "./common/topbar";

function Root() {
  return (
    <AppContext.Provider>
      <div className="content">
        <div className="sidebar-layout">
          <Sidebar />
        </div>
        <div className="topbar-layout">
          <TopBar />
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
    </AppContext.Provider>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AppContext.Provider>
          <Root />
        </AppContext.Provider>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
