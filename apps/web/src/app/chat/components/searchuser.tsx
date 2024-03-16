import React, { ReactNode, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserRoundPlus, XCircle,Hourglass } from "lucide-react";
import { UserCard } from "./userCard";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useSocket, useUser, useUsers } from "@/app/hooks";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { Box } from "@radix-ui/themes";

export const SearchDialogContent = () => {
  const { users } = useUsers();
  const user = useUser();
  const [btntoggle,setbtnToggle]=useState<boolean>(false);
  const [requestIndex,setRequestIndex]=useState<number>(-1);
  const socket = useSocket();
  const sendRequest = (data: { username: string; _id: string | undefined },index:number) => {
    const request = {
      RequestType: "connection",
      sender: { username: user?.username, _id: user?.id },
      recipient: data,
    };
    socket?.emit("connectionRequest", request);
    setRequestIndex(index)
  };
  const RemoveConnection = () => {};

  return (
    <DialogContent className="gap-0 p-0 outline-none max-h-[525px]">
      <DialogHeader className="px-4 pb-4 pt-5">
        <DialogTitle>Make connections all around world</DialogTitle>
        <DialogDescription>
          Invite a user to this thread. This will create a new group message.
        </DialogDescription>
      </DialogHeader>
      <Command className="overflow-hidden rounded-t-none border-t">
        <CommandInput placeholder="Search user..." />
        <CommandList>
          <CommandEmpty>No users found.</CommandEmpty>
          <CommandGroup className="p-2 max-h-[525px] h-[300px] overflow-y-scroll">
            {users?.map((user, i) => (
              <CommandItem
                key={i}
                className="flex items-center justify-between gap-x-3"
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
                      {user?.username}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ajaysehwal@gmail.com
                    </p>
                  </Box>
                </Box>
                <Box className="flex items-center justify-end align-end gap-1">
                  {requestIndex===i?(
                       <TooltipProvider>
                       <Tooltip>
                         <TooltipTrigger>
                           <Button
                             variant="ghost"
                             size="icon"
                             className="rounded-full"
                           >
                             <Hourglass className="w-5 h-5" />
                           </Button>
                         </TooltipTrigger>
                         <TooltipContent>
                           <p>Withdrawn Request</p>
                         </TooltipContent>
                       </Tooltip>
                     </TooltipProvider>
                  ):(
                    <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          onClick={() =>
                            sendRequest({
                              username: user.username,
                              _id: user._id,
                            },i)
                          }
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                        >
                          <UserRoundPlus className="w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Send request</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  )}
                 
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button variant="ghost" size="icon">
                          <XCircle className="w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>remove</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Box>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </DialogContent>
  );
};
