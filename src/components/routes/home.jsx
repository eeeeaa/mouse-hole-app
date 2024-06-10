import { AppContext } from "../../utils/contextProvider";
import { useContext } from "react";

export default function Home() {
  const { getCurrentUser } = useContext(AppContext);
  return <div>{getCurrentUser().username}</div>;
}
