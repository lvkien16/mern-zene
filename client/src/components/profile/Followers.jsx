import { Modal } from "flowbite-react";
import User from "./User";

export default function Followers({
  showFollowers,
  setShowFollowers,
  followers,
}) {
  console.log(followers);
  return (
    <div>
      <Modal
        show={showFollowers}
        onClose={() => setShowFollowers(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col gap-2">
            {followers &&
              followers.map((follower, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <User follow={follower} setFollow={setShowFollowers} />
                </div>
              ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
