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
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("unsend", async (id) => {
    try {
      const message = await Message.findById(req.params.messageId);
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      await Message.deleteOne({ _id: req.params.messageId });
      io.emit("unsend", req.params.messageId);
    } catch (err) {
      console.log(err);
    }
  });
};
