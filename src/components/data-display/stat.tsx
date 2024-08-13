import React, { FC, ReactElement } from "react";
import { NextUIColor } from "@/components/types";

interface StatCardProps {
  title: string;
  stat: string;
  change: string;
  changeType: "increase" | "decrease";
  cardColor?: NextUIColor;
  icon?: ReactElement<"svg">;
}

const StatCard: FC<StatCardProps> = ({
  title,
  stat,
  icon,
  change,
  changeType,
  cardColor = "primary-100",
}) => {
  const defaultIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
  icon = icon || defaultIcon;
  const c = `bg-${cardColor}`;
  const cardClass = `${c} shadow-2xl shadow-primary-400 rounded-lg p-6 w-80`;
  return (
    <div className={cardClass}>
      <div className="flex items-center">
        <div className="p-3 bg-primary-300 text-default-800 rounded-full">
          {icon}
        </div>
        <div className="ml-4">
          <h4 className="text-primary-500 font-semibold">{title}</h4>
          <div className="text-2xl font-bold text-primary-800">{stat}</div>
        </div>
      </div>
      <div
        className={`mt-4 text-sm font-semibold ${changeType === "increase" ? "text-success-500" : "text-danger-500"}`}
      >
        {changeType === "increase" ? "▲" : "▼"} {change}
      </div>
    </div>
  );
};
export default StatCard;
