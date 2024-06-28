import Informations from "../components/profile/Informations";
import Posts from "../components/profile/Posts";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { userId } = useParams();
  return (
    <div className="p-2">
      <Informations userId={userId} />
      <Posts userId={userId} />
    </div>
  );
}
