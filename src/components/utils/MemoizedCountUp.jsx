import { memo } from "react";
import CountUp from "react-countup";

const MemoizedCountUp = memo(({ end }) => (
  <CountUp
    key={end} // Ensures update only when value changes
    end={end}
    duration={2}
    separator=","
    formattingFn={(value) =>
      new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 2,
      }).format(value)
    }
  />
));

MemoizedCountUp.displayName = "MemoizedCountUp";

export default MemoizedCountUp;
