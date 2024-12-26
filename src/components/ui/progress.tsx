"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { motion } from "framer-motion";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className="relative h-4 w-full overflow-hidden rounded-full bg-secondary"
    {...props}
  >
    <motion.div
      className="h-full w-full flex-1 bg-gradient-to-r from-blue-500 to-puple-500 transition-all"
      style={{ transformOrigin: "0%" }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: value ? value / 100 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
