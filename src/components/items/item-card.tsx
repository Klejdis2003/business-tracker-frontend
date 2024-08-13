import { Item } from "@/type-definitions";
import { NextUIColor } from "@/components/types";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
} from "@nextui-org/card";
import { FC } from "react";

type ItemCardProps = { item: Item } & CardProps;

const ItemCard: FC<ItemCardProps> = ({ item, ...props }) => {
  return (
    <Card {...props}>
      <CardHeader>{item.name}</CardHeader>
      <CardBody>
        <h1>{item.price}</h1>
        <h1>{item.purchasePrice}</h1>
      </CardBody>
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny">Available soon.</p>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
