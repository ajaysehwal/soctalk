import { useUsers } from "@/app/hooks/useUsers";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { UsersList } from "./Skeletons";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSocket } from "@/app/hooks";
interface Users{
 _id:string,
 username:string,
}
export default function SidebarUsers() {
  const variants = {
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

  const { loading } = useUsers();
  const { id } = useParams();

  const socket=useSocket();
  const [connection,setConnection]=useState<Users[]>([]);
  
  const getConnections=()=>{
    socket?.on('getconnections',(connections:Users[])=>{
      setConnection(connections);
    })
  }
  useEffect(()=>{
   getConnections();
   return ()=>{
     socket?.off('getconnections');
   }
  },[socket])
  return (
    <ScrollArea>
      <div className="h-full">
        <ul className="space-y-1.5 p-4">
          <Suspense fallback={<UsersList />}>
            {loading ? (
              <UsersList />
            ) : (
              connection.map((el, i) => (
                <motion.li
                  key={i}
                  variants={variants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    className={`flex items-center gap-x-3 py-2 px-3 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ${
                      el._id === id && "bg-gray-100"
                    }`}
                    href={`/chat/${el._id}`}
                    shallow={true}
                  >
                    <div className="relative inline-block">
                      <Avatar>
                        <AvatarImage
                          className="inline-block size-[38px] rounded-full"
                          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                          alt="Image Description"
                        />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>

                      <span className="absolute bottom-0 end-0 block size-2 rounded-full ring-2 ring-white bg-green-400"></span>
                    </div>

                    {el.username}
                  </Link>
                </motion.li>
              ))
            )}
          </Suspense>
        </ul>
      </div>
    </ScrollArea>
  );
}
