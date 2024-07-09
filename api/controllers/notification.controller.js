import Notification from "../models/notification.model.js";

export const createNotification = async ({ title, fromUser, toUser, link }) => {
  const notification = new Notification({
    title,
    fromUser: fromUser,
    toUser: toUser,
    link,
  });
  return notification.save();
};

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ toUser: req.user.id }).sort(
      { createdAt: -1 }
    );
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

export const readNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }
    notification.isRead = true;
    await notification.save();
    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
};
