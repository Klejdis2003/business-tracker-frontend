import { Item } from "@/type-definitions";
import ItemCard from "@/components/items/item-card";

const ItemCardDisplay = ({ items }: { items: Item[] }) => {
  return (
    <div className={"flex flex-col gap-3"}>
      {items.map((item, index) => (
        <ItemCard key={index} item={item} />
      ))}
    </div>
  );
};

export default ItemCardDisplay;
