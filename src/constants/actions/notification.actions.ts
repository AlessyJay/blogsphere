import { validateRequest } from "@/lib/validateRequest";
import { prisma } from "@/prisma";

export const GetAllNotifications = async () => {
  try {
    const session = await validateRequest();

    if (!session.user?.id) {
      throw new Error("Unauthorized");
    }

    const notifications = await prisma.notifications.findMany({
      where: { userId: session.user?.id },
      orderBy: { createdAt: "desc" },
    });

    return notifications;
  } catch (error) {
    console.error("Error fetching notifications: " + error);
    return [];
  }
};

export const markAsRead = async (id: string) => {
  try {
    const session = await validateRequest();

    if (!session.user?.id) {
      throw new Error("Unauthorized");
    }

    await prisma.notifications.update({
      where: { userId: session.user?.id, id },
      data: { read: true },
    });

    return { sucess: true };
  } catch (error) {
    console.error("Error marking notifications as read: " + error);
    return { sucess: false };
  }
};

export const deleteNotification = async (id: string) => {
  try {
    await prisma.notifications.delete({ where: { id } });
    return { sucess: true };
  } catch (error) {
    console.error("Error deleting notification: " + error);
    return { sucess: false };
  }
};
