"use client";
import { Item } from "@/type-definitions";
import { DeleteIcon, EditIcon } from "@nextui-org/shared-icons";
import { Tooltip } from "@nextui-org/tooltip";

const ItemActions = ({ item }: { item: Item }) => {
  return (
    <div className={"relative flex items-center gap-3"}>
      <Tooltip content={"Edit Item"} color={"primary"}>
        <EditIcon
          className={"text-primary-500 size-5 active:opacity-50"}
          onClick={() => console.log(`Edit clicked for ${item.name}`)}
        />
      </Tooltip>
      <Tooltip content={"Delete Item"} color={"danger"}>
        <span className={"text-danger-500 border-red-500"}>
          <DeleteIcon
            className={"text-danger-500 size-5 border-b--500"}
            onClick={() => console.log(`Delete clicked for ${item.name}`)}
          />
        </span>
      </Tooltip>
    </div>
  );
};

export default ItemActions;
