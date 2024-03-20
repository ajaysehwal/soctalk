import React, { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchDialogContent } from "./searchuser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NotificationButton from "./notification";
import { Bell, Users } from "lucide-react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import { motion, useAnimation } from "framer-motion";

import { Box } from "@radix-ui/themes";
import { cn } from "@/lib/utils";

export default function RightSideBar() {
  const [toggle, setToggle] = useState<boolean>(false);
  const toggleSidebar = () => setToggle(!toggle);

  return (
    <>
      <Box
        className={cn(
          "fixed top-[42%] z-10 right-[44px] transition-all duration-500",
          toggle && "right-[130px]"
        )}
      >
        <Button
          size="icon"
          variant="link"
          onClick={toggleSidebar}
          className="p-0"
        >
          {toggle ? (
            <ArrowRightCircleIcon className="w-6 h-auto text-primary drop-shadow-lg" />
          ) : (
            <ArrowLeftCircleIcon className="w-6 h-auto text-primary drop-shadow-lg" />
          )}
        </Button>
      </Box>
      <motion.div
        className={`fixed top-3 ${
          toggle && "w-[150px]"
        } right-0 h-[80vh] bg-blue-200 rounded-full  border-l py-10 px-5 transition-all duration-500 ease-in-out`}
      >
        <div className="flex flex-col gap-2">
          <FindUserButton toggle={toggle} />
        </div>
      </motion.div>
    </>
  );
}
const FindUserButton = ({ toggle }: { toggle: boolean }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="link"
            size="icon"
            className="flex w-full  items-center gap-2"
          >
            <Users className="w-6 h-6" />
            {toggle && <p>Find Users</p>}
          </Button>
        </DialogTrigger>
        <SearchDialogContent />
      </Dialog>
    </>
  );
};

