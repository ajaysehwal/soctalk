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
  XCircle,
} from "lucide-react";
import { Box } from "@radix-ui/themes";
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
export default function NotificationButton({ toggle }: { toggle: boolean }) {
  const socket = useSocket();
  const [statusToggle, setStatusToggle] = useState<boolean>(false);
  const [notifications, setNotification] = useState<ConnectionRequests[]>([]);
  useEffect(() => {
    socket?.on("getconnectionRequest", (data) => {
      setNotification(data);
    });
    return () => {
      socket?.off("getconnectionRequest");
    };
  }, [socket]);
  const AcceptConnectionRequest = (data: {
    status: "Accepted";
    _id: string;
    senderId: string;
  }) => {
    setNotification((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification._id === data._id
          ? { ...notification, status: "Accepted" }
          : notification
      )
    );
    socket?.emit("acceptConnectionRequest", data);
    return () => {
      socket?.off();
    };
  };
  const RecivedConnectionRequest = () => {
    socket?.on("receivedConnectionRequest", (request) => {
      setNotification((prev) => [...prev, request]);
    });
  };

  useEffect(() => {
    RecivedConnectionRequest();

    return () => {
      socket?.off("recivedConnectionRequest");
    };
  }, [socket]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="icon"
          className="flex w-full  items-center gap-2"
        >
          <Bell className="w-6 h-6" />
          {toggle && <p>Notification</p>}
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-0 p-0 outline-none max-h-[525px]">
        <DialogHeader className="px-4 pb-4 pt-5">
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>You have 3 unread messages.</DialogDescription>
        </DialogHeader>
        <Box className="flex flex-col h-[250px]">
          {notifications.map((notification, index) => (
            <Box
              className={`flex items-center gap-x-3 p-5 ${
                notification.status === "Accepted"
                  ? "justify-start"
                  : "justify-between"
              }`}
            >
              <Box key={index} className="flex items-center gap-1">
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
                    {notification?.sender.username}{" "}
                    {notification.status === "Accepted" && (
                      <span className="text-blue-600 font-semibold">
                        is now in your connections
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ajaysehwal@gmail.com
                  </p>
                </Box>
              </Box>
              {notification.status !== "Accepted" && (
                <Box className="flex items-center justify-end gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          onClick={() =>
                            AcceptConnectionRequest({
                              _id: notification._id,
                              senderId: notification?.sender._id,
                              status: "Accepted",
                            })
                          }
                          variant="secondary"
                          size="icon"
                          className="rounded-full"
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
                          className="rounded-full"
                          variant="destructive"
                          size="icon"
                        >
                          <XCircle className="w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Cancel</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Box>
              )}
            </Box>
          ))}
        </Box>
        <DialogFooter>
          <Button>
            <CheckIcon className="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
