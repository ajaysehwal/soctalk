import React, { useEffect, useState } from "react";
import { useSocket } from "@/app/hooks";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Bell,
  BellIcon,
  CheckIcon,
  Database,
  UserRoundPlus,
  X,
} from "lucide-react";
import { Box } from "@radix-ui/themes";
import { motion } from "framer-motion";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
interface ConnectionRequests {
  _id: string;
  sender: {
    username: string;
    _id: string;
  };
  status: string;
  timestamp: any;
}
interface NOTIFICATION {
  Type: string;
  notification: {
    _id: string;
    sender?: {
      username: string;
      _id: string;
    };
    recipient?: {
      username: string;
      _id: string;
    };
    status: string;
    timestamp: any;
  };
}
interface ConnectionResponses {
  _id: string;
  recipient: {
    username: string;
    _id: string;
  };
  status: string;
  timestamp: any;
}
const DivVariants = {
  open: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "easeInOut",
      damping: 15,
      stiffness: 400,
      staggerChildren: 0.1,
    },
  },
  closed: {
    scale: 0.5,
    opacity: 0,
    transition: {
      type: "easeInOut",
      duration: 0.3,
    },
  },
};
const ButtonVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};
export default function Notification() {
  const socket = useSocket();
  const [statusToggle, setStatusToggle] = useState<boolean>(false);
  const [notifications, setNotification] = useState<NOTIFICATION[]>([]);
  const [notificationLength, setNotificationLength] = useState<number>(-1);
  const notificationBoxLengthCounter = () => {
    const length = notifications.length;
    setNotificationLength(length);
  };
  const ConnectionRequestResponse = (data: {
    status: string;
    _id: string;
    senderId: string;
  }) => {
    setNotification((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.notification._id === data._id
          ? { ...notification, status: data.status }
          : notification
      )
    );
    socket?.emit("ConnectionResponse", data);
    return () => {
      socket?.off("ConnectionResponse");
    };
  };
  const toggleNotification = () => {
    setStatusToggle((prevStatus) => !prevStatus);
    setNotificationLength(0);
  };

  const HandleNotification = (notification: NOTIFICATION) => {
    console.log(notification);
    setNotification((prev) => [...prev, notification]);
  };

  useEffect(() => {
    socket?.on("notification", (latestNotication)=>{
      HandleNotification(latestNotication)
    });
    notificationBoxLengthCounter();
    return () => {
      socket?.off("notification");
    };
  }, [socket]);
  return (
    <>
      <motion.div
        initial="closed"
        exit={{ scale: 0 }}
        animate={statusToggle ? "open" : "closed"}
        variants={DivVariants}
        className={`fixed right-0 ${
          !statusToggle && "hidden"
        } bottom-[120px] z-[999] bg-white border-gray-500 border-1 p-3 h-[425px] w-[400px] max-h-[525px] max-w-[500] shadow-lg`}
      >
        <div className="p-1 border-b-2 mb-2">Notification</div>
        <ul className="flex flex-col gap-1">
          {notifications?.map((notification, index) => (
            <li key={index}>
              {notification.Type === "connection_request" && (
                <ConnectionRequestBox
                  notification={notification.notification}
                  onClick={ConnectionRequestResponse}
                />
              )}
            </li>
          ))}

          {notifications.map((notification, index) => (
            <li key={index}>
              {notification.Type === "connection_response" && (
                <RequestResponseBox response={notification.notification} />
              )}
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.button
        onClick={toggleNotification}
        variants={ButtonVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed flex items-center align-middle justify-center bottom-10 right-6 rounded-full w-16 h-16 bg-gradient-to-br from-blue-300 to-blue-600 shadow-md outline-none cursor-pointer hover:shadow-none text-white"
      >
        {notificationLength > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 p-0 rounded-full">
            {notificationLength}
          </span>
        )}

        <Bell className="w-6 h-6" />
      </motion.button>
    </>
  );
}
const ConnectionRequestBox = ({
  notification,
  onClick,
}: {
  notification: any;
  onClick: (data: any) => void;
}) => {
  return (
    <>
      <Box
        className={`${
          notification.status === "accpeted" && "flex"
        } items-center justify-between gap-3 bg-gray-100 p-2 rounded-lg`}
      >
        <Box className="flex items-center gap-1">
          <Avatar>
            <AvatarImage
              className="inline-block size-[38px] rounded-full"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              alt="Image"
            />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Box className="ml-2">
            <p className="text-sm font-medium leading-none">
              {notification?.sender.username}
            </p>
          </Box>
        </Box>
        {notification.status === "pending" ? (
          <Box className="flex justify-end items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={() =>
                      onClick({
                        _id: notification._id,
                        senderId: notification?.sender._id,
                        status: "accpeted",
                      })
                    }
                    className="bg-green-600 hover:bg-green-500"
                  >
                    <UserRoundPlus className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Accept</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      onClick({
                        _id: notification._id,
                        senderId: notification?.sender._id,
                        status: "rejected",
                      })
                    }
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Decline</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Box>
        ) : (
          <Box>is now in your connections</Box>
        )}
      </Box>
    </>
  );
};
const RequestResponseBox = ({ response }: { response: any }) => {
  return (
    <>
      <Box className="flex items-center gap-1 p-2 bg-gray-100">
        <Avatar>
          <AvatarImage
            className="inline-block size-[38px] rounded-full"
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
            alt="Image"
          />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium leading-none underline hover:underline-none">
          {response.recipient.username}{" "}
          <span
            className={`${
              response.status === "accepted" ? "text-green-600" : "text-red-600"
            }`}
          >
            {response.status === "accepted" ? "Accept" : "Decline"}
          </span>{" "}
          your connection request
        </p>
      </Box>
    </>
  );
};
