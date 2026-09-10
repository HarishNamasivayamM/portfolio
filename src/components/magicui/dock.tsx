"use client";

import { cn } from "@/lib/utils";
import { motion, type MotionValue, useMotionValue, useSpring, useTransform } from "motion/react";
import { createContext, useContext, useRef, type ReactNode } from "react";

interface DockProps {
  className?: string;
  children: ReactNode;
  magnification?: number;
  distance?: number;
  orientation?: "horizontal" | "vertical";
}

interface DockIconProps {
  className?: string;
  children?: ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 100;
const BASE_SIZE = 36;
const BASE_ICON_SIZE = 18;
const ICON_SIZE_RATIO = 0.5;
const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };

interface DockContextValue {
  pointerPosition: MotionValue<number>;
  magnification: number;
  distance: number;
  orientation: "horizontal" | "vertical";
}

const DockContext = createContext<DockContextValue | null>(null);

const Dock = ({ className, children, magnification = DEFAULT_MAGNIFICATION, distance = DEFAULT_DISTANCE, orientation = "horizontal" }: DockProps) => {
  const pointerPosition = useMotionValue(Infinity);

  return (
    <DockContext.Provider value={{ pointerPosition, magnification, distance, orientation }}>
      <motion.div
        onMouseMove={(e) => pointerPosition.set(orientation === "vertical" ? e.clientY : e.clientX)}
        onMouseLeave={() => pointerPosition.set(Infinity)}
        className={cn(
          "mx-auto flex w-max overflow-visible rounded-full border",
          orientation === "vertical" ? "flex-col items-center justify-center" : "h-full items-end justify-center",
          className,
        )}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
};

const DockIcon = ({ className, children }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const context = useContext(DockContext);

  if (!context) {
    throw new Error("DockIcon must be used within a Dock component");
  }

  const { pointerPosition, magnification, distance, orientation } = context;

  const distanceCalc = useTransform(pointerPosition, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 0, height: 0 };
    const center = orientation === "vertical" ? bounds.y + bounds.height / 2 : bounds.x + bounds.width / 2;
    return val - center;
  });

  const containerSize = useSpring(
    useTransform(distanceCalc, [-distance, 0, distance], [BASE_SIZE, magnification, BASE_SIZE]),
    SPRING
  );
  const iconSize = useSpring(
    useTransform(distanceCalc, [-distance, 0, distance], [BASE_ICON_SIZE, magnification * ICON_SIZE_RATIO, BASE_ICON_SIZE]),
    SPRING
  );

  return (
    <motion.div
      ref={ref}
      style={{ width: containerSize, height: containerSize }}
      className={cn("relative flex aspect-square items-center justify-center rounded-full shrink-0", className)}
    >
      <motion.div
        style={{ width: iconSize, height: iconSize }}
        className="flex items-center justify-center"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export { Dock, DockIcon };
export type { DockProps, DockIconProps };
