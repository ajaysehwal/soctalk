import { Skeleton } from "@/components/ui/skeleton";

const MessageS = () => {
  return <Skeleton className="w-[130px] h-10 bg-blue-200 rounded-full" />;
};

export const MessageSkeletons = () => {
  return (
    <>
      <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
        <MessageS />
      </li>
      <li className="flex gap-x-2 sm:gap-x-4">
        <MessageS />
      </li>
      <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
        <MessageS />
      </li>
      <li className="flex gap-x-2 sm:gap-x-4">
        <MessageS />
      </li>
      <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
        <MessageS />
      </li>
    </>
  );
};
