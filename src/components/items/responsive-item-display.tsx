import { ITEM_SERVICE } from "@/service/definitions";
import ResponsiveContainer from "@/components/ui/layout/responsive-container";
import React from "react";
import ItemCardDisplay from "@/components/items/item-card-display";
import ItemsTable from "@/components/items/items-table";

const ResponsiveItemDisplay = async () => {
  const items = await ITEM_SERVICE.getItems();
  return (
    <ResponsiveContainer
      xs={<ItemCardDisplay items={items} />}
      sm={<ItemsTable items={items} />}
    />
  );
};

export default ResponsiveItemDisplay;
