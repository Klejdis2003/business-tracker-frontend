import { ReactElement, ReactNode } from "react";

type FlexType = "row" | "col";

interface ContainerProps {
  children: ReactNode;
  flexType?: FlexType;
  className?: string;
}

/**
 * Container component to wrap children with some default padding and flex properties.
 * * Default flex direction is column.
 * * Default padding is p-7.
 * * Default space between children is space-y-3.5 for column and space-x-3.5 for row.
 * @param children The children to wrap.
 * @param className Tailwind CSS classes to apply to the container. Can be used to add new styles or override
 * existing ones.
 * @param flexType The flex direction of the container
 */
export default function Container({
  children,
  className = "",
  flexType = "col",
}: ContainerProps) {
  return (
    <div
      className={`p-7 flex ${flexType == "row" ? "flex-row space-x-3.5" : "flex-col space-y-3.5"} ${className} `}
    >
      {children}
    </div>
  );
}
