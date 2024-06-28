import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Modal } from "flowbite-react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { RiImageAddFill } from "react-icons/ri";
import { FaFileUpload } from "react-icons/fa";
import { Alert } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [files, setFiles] = useState(null);
  const [imagesUploadError, setImagesUploadError] = useState(null);
  const [imagesUploadProgress, setImagesUploadProgress] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleShowCreatePost = () => {
    setShowCreatePost(true);
  };

  const handleUploadImages = async () => {
    try {
      if (!files || files.length === 0) {
        setImagesUploadError("Please select images to upload");
        return;
      }
      setImagesUploadError(null);

      const storage = getStorage(app);
      const uploadPromises = Array.from(files).map((fileItem) => {
        const fileName = new Date().getTime() + "-" + fileItem.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, fileItem);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setImagesUploadProgress((prevProgress) => ({
                ...prevProgress,
                [fileItem.name]: progress.toFixed(0),
              }));
            },
            (error) => {
              setImagesUploadError(`Failed to upload image: ${fileItem.name}`);
              setImagesUploadProgress(null);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImagesUploadProgress(null);
                resolve({ fileName: fileItem.name, url: downloadURL });
              });
            }
          );
        });
      });

      const downloadURLs = await Promise.all(uploadPromises);
      const images = downloadURLs.map((item) => item.url);
      setFormData((prevFormData) => ({
        ...prevFormData,
        images,
      }));
      setImagesUploadError(null);
    } catch (error) {
      setImagesUploadError("Failed to upload images");
      setImagesUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.images) {
      setPublishError("Please select images and upload them to publish post");
      return;
    }
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        onClick={handleShowCreatePost}
        className="flex items-center justify-center gap-2 bg-primary text-white border hover:bg-transparent hover:text-primary border-primary w-full py-2 rounded-lg font-semibold focus:outline-none"
      >
        <CiCirclePlus className="text-3xl" />
        Create a post
      </button>
      <Modal
        show={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        popup
        size="md"
      >
        <Modal.Header>
          <span className="text-2xl text-center mx-auto font-bold text-primary">
            Create new post
          </span>
        </Modal.Header>

        <Modal.Body>
          <div className="">
            <div className="">
              <div className="">
                <form onSubmit={handleSubmit}>
                  <div className="flex justify-between">
                    <label
                      htmlFor="add-images"
                      className="rounded flex gap-3 items-center border px-2 text-white bg-primary
                       border-primary
                       hover:bg-transparent hover:text-primary
                       hover:cursor-pointer"
                    >
                      <RiImageAddFill />
                      Add images
                    </label>
                    <button
                      type="button"
                      onClick={handleUploadImages}
                      disabled={Object.values(imagesUploadProgress || {}).some(
                        (progress) => progress !== null
                      )}
                      className="flex items-center gap-2 text-primary
                       border border-primary
                       px-2 hover:bg-primary
                       hover:text-white rounded"
                    >
                      {imagesUploadProgress ? (
                        <span>Uploading...</span>
                      ) : (
                        <>
                          <FaFileUpload />
                          Upload
                        </>
                      )}
                    </button>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    id="add-images"
                    name="images"
                    multiple
                    hidden
                    onChange={(e) => setFiles(e.target.files)}
                  />
                  <div className="mt-3">
                    {imagesUploadError && (
                      <Alert color="failure">{imagesUploadError}</Alert>
                    )}
                    {publishError && (
                      <Alert color="failure">{publishError}</Alert>
                    )}
                  </div>
                  <div className="show selected images name"></div>
                  <div className="show selected images">
                    {
                      <div className="flex gap-3 flex-wrap">
                        {formData.images &&
                          formData.images.map((image, index) => (
                            <div key={index}>
                              <img
                                src={image}
                                alt=""
                                className="w-14 h-14 object-cover rounded border border-gray-200"
                              />
                            </div>
                          ))}
                      </div>
                    }
                  </div>
                  <textarea
                    className="mt-3 border rounded w-full outline-none p-2 border-primary
                     text-primary
                    "
                    name="content"
                    id=""
                    placeholder="Write something here..."
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        content: e.target.value,
                      })
                    }
                  />
                  <div className="images chooces"></div>
                  <div className="">
                    <button
                      type="submit"
                      className="border px-2 bg-primary
                       text-white hover:bg-transparent hover:text-primary
                       rounded border-primary
                       mt-3 w-full"
                    >
                      Publish
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
