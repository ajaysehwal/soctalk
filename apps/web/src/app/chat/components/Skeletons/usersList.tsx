import PropTypes from "prop-types";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonUI = ({ style }: { style: string }) => {
  return <Skeleton className={style} />;
};

SkeletonUI.propTypes = {
  style: PropTypes.string.isRequired,
};

export const UsersList = () => {
  const skeletonWidths = ["100%","95%", "90%", "80%"];

  return (
    <li>
      {skeletonWidths.map((width, index) => (
        <SkeletonUI key={index} style={`gap-x-3 py-4 px-3 mb-2 w-[${width}]`} />
      ))}
    </li>
  );
};
