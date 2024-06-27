import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../utils/contextProvider";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../../../styles/routes/profile.module.css";

import { updateMyProfile } from "../../../domain/user/userUseCase";

import ErrorPage from "../../common/error";
import LoadingPage from "../../common/loadingPage";

function UserProfile() {
  const { userId } = useParams();
  const { cookies } = useContext(AppContext);
  const token = cookies["token"];

  return <div>user profile of {userId}</div>;
}

export default function ProfilePage() {
  return <UserProfile />;
}
