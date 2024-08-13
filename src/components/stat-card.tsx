import { ReactNode } from "react";
import { NextUIColorType } from "@/components/types";
import { card } from "@nextui-org/theme";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

interface StatCardProps {
  title: string;
  stat: string;
  description: string;
  cardColor?: NextUIColorType;
  icon?: ReactNode;
}
const StatCard = ({
  title,
  stat,
  description,
  cardColor = "primary",
}: StatCardProps) => {
  return (
    <Card
      shadow={"lg"}
      isPressable={false}
      isHoverable
      className={`min-w-64 p-3 shadow-lg shadow-${cardColor}-100 bg-${cardColor}-50 `}
    >
      <CardHeader
        className={`flex-col items-start space-y-0 px-3 py-2 pb-0 text-${cardColor}-400`}
      >
        <p className={"text-tiny uppercase font-bold"}>{title}</p>
        <small className={"text-default-600"}>Item with the most sales</small>
        <h4 className="font-bold text-large">{description}</h4>
      </CardHeader>
      <CardBody className="flex flex-col px-3 pb-2 pt-0">
        <div className={`text-4xl font-bold text-${cardColor}-600`}>{stat}</div>
      </CardBody>
    </Card>
  );
};

export default StatCard;
