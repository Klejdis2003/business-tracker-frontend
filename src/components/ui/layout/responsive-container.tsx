"use client";
import { FC, ReactNode, useCallback, useMemo, useState } from "react";
import useWindowSize from "@/hooks/use-window-size";
import { Spinner } from "@nextui-org/spinner";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
const breakpointMappings: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

interface ResponsiveContainerProps {
  xs?: ReactNode;
  sm?: ReactNode;
  md?: ReactNode;
  lg?: ReactNode;
  xl?: ReactNode;
}

const ResponsiveContainer: FC<ResponsiveContainerProps> = ({ ...props }) => {
  const size = useWindowSize();
  const definedBreakpoints = Object.keys(props).filter(
    (key) => key,
  ) as Breakpoint[];

  if (definedBreakpoints.length === 0) {
    throw new Error("No breakpoint defined in ResponsiveContainer");
  }
  const breakpoint = getBreakpoint();

  function getBreakpoint(): Breakpoint | undefined {
    const width = size.width;
    if (!width) return undefined;
    return definedBreakpoints.findLast(
      (key) => width >= breakpointMappings[key],
    )!;
  }

  return (
    <>
      {breakpoint ? (
        props[breakpoint]
      ) : (
        <Spinner label={"Loading..."} size={"lg"} />
      )}
    </>
  );
};

export default ResponsiveContainer;
