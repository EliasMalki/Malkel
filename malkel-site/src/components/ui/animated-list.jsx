import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils"

export function AnimatedListItem({
  children
}) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  }

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}

export const AnimatedList = React.memo(({
  children,
  className,
  delay = 1000,
  maxItems = 5,
  ...props
}) => {
  const [index, setIndex] = useState(0)
  const childrenArray = useMemo(() => React.Children.toArray(children), [children])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prevIndex) => prevIndex + 1)
    }, delay)

    return () => clearTimeout(timeout)
  }, [index, delay])

  const itemsToShow = useMemo(() => {
    const result = []
    for (let i = 0; i < Math.min(index + 1, maxItems); i++) {
      const globalIndex = index - i;
      const actualIndex = globalIndex % childrenArray.length;
      const child = childrenArray[actualIndex];
      result.push(React.cloneElement(child, { key: `item-${globalIndex}` }));
    }
    return result
  }, [index, childrenArray, maxItems])

  return (
    <div className={cn(`flex flex-col items-center gap-4`, className)} {...props}>
      <AnimatePresence>
        {itemsToShow.map((item) => (
          <AnimatedListItem key={item.key}>
            {item}
          </AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  );
})

AnimatedList.displayName = "AnimatedList"
