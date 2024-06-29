import Message from "../models/message.model.js";

export const onConnection = (socket, io) => {
  socket.on("message", async (data) => {
    try {
      const message = new Message({
        conversationId: data.conversationId,
        senderId: data.senderId,
        content: data.content,
      });
      await message.save();
      io.emit("message", message);
    } catch (err) {
      console.log(err);
    }
  });
};
