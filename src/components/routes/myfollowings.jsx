import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../utils/contextProvider";
import styles from "../../styles/routes/myfollowings.module.css";

import { getMyFollowingsUseCase } from "../../domain/user/userUseCase";

import LoadingPage from "../common/loadingPage";

export default function MyFollowings() {
  const { cookies, notify } = useContext(AppContext);
  const token = cookies["token"];
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { users, error } = await getMyFollowingsUseCase(token);
        if (error) {
          setLoading(false);
          setErr(error);
          return;
        }
        setFollowings(users);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErr(error);
      }
    };
    loadData();
  }, [token]);

  useEffect(() => {
    if (err) {
      notify(err.message, "error");
    }
  }, [err, notify]);

  if (loading) return <LoadingPage />;

  return (
    <div className={styles.container}>
      {followings.length > 0 ? (
        followings.map((user) => {
          return <li key={user._id}>{user.username}</li>;
        })
      ) : (
        <li>you have no one you are following.</li>
      )}
    </div>
  );
}
