import Message from "../models/message.model.js";

export const onConnection = (socket, io) => {
  socket.on("message", async (data) => {
    try {
      const message = new Message({
        sender: req.user.id,
        receiver: req.params.receiver,
        text: data.text,
        images: data.images,
        videos: data.videos,
      });
      await message.save();
      io.emit("message", message);
      io.emit("conversation", message);
    } catch (err) {
      console.log(err);
    }
  });
};
