import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const FileItemSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <li className="list-group-item" key={index}>
          <Skeleton height={50} />
        </li>
      ))}
    </>
  );
};
