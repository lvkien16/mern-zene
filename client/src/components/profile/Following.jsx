import { Modal } from "flowbite-react";
import User from "./User";

export default function Following({
  showFollowing,
  setShowFollowing,
  following,
}) {
  console.log(following);
  return (
    <div>
      <Modal
        show={showFollowing}
        onClose={() => setShowFollowing(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col gap-2">
            {following &&
              following.map((following, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <User follow={following} setFollow={setShowFollowing} />
                </div>
              ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
