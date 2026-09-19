import { Icon } from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export const StarRating = ({ rating = 0, boxSize = 4 }) => {
  const filledCount = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyCount = 5 - filledCount - (hasHalf ? 1 : 0);

  return (
    <div className="flex text-primary">
      {Array.from({ length: filledCount }).map((_, i) => (
        <Icon as={FaStar} key={`filled-${i}`} boxSize={boxSize}/>
      ))}
      {hasHalf && <Icon as={FaStarHalfAlt} key="half" boxSize={boxSize}/>}
      {Array.from({ length: emptyCount }).map((_, i) => (
        <Icon as={FaRegStar} key={`empty-${i}`} boxSize={boxSize}/>
      ))}
    </div>
  );
};
