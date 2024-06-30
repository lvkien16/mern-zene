import { useSelector } from "react-redux";

export default function ShowComponent() {
  const { currentUser } = useSelector((state) => state.user);

  return <div className={`${currentUser ? "" : "hidden"}`}></div>;
}
