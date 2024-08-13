"use client";
import { Item } from "@/type-definitions";
import { ReactElement } from "react";
import Table from "@/components/data-display/table";
import { Button } from "@nextui-org/button";
import { DeleteIcon, EditIcon } from "@nextui-org/shared-icons";
import ItemActions from "@/components/items/item-actions";
/**
 * Represents a map of titles to cells.
 * @property title - The title of the cell
 */
interface TitleToCellMap {
  [title: string]: (item: Item) => ReactElement;
}
const ItemsTable = ({ items }: { items: Item[] }) => {
  const titleToCellMap: TitleToCellMap = {
    Name: (item: Item) => (
      <h1 className={"text-medium font-bold"}>{item.name}</h1>
    ),
    Expense: (item: Item) => (
      <h1 className={"text-medium text-danger-600"}>{item.purchasePrice}</h1>
    ),
    Sale: (item: Item) => (
      <h1 className={"text-medium text-primary-600 "}>{item.price}</h1>
    ),
    Profit: (item: Item) => (
      <h1 className={"text-medium text-success-600"}>
        {item.price! - item.purchasePrice!}
      </h1>
    ),
    Currency: (item: Item) => (
      <h1 className={"text-medium text-default-600"}>{item.currency.code}</h1>
    ),
    Actions: (item: Item) => <ItemActions item={item} />,
  };

  return (
    <Table
      aria-label={"Items Table"}
      isHeaderSticky
      isStriped
      headers={Object.keys(titleToCellMap)}
      rows={getRowElements()}
      bottomContent={
        <Button variant={"flat"} color={"primary"} fullWidth={false}>
          Add Item
        </Button>
      }
      bottomContentPlacement={"outside"}
      color={"primary"}
      className={"w-full lg:w-[60%] mx-auto"}
      classNames={{
        wrapper: "max-h-[90%] overflow-y-scroll",
      }}
    />
  );

  function getRowElements() {
    const rowElements: ReactElement[][] = [];
    items.forEach((item) => {
      rowElements.push(getRow(item));
    });
    return rowElements;
  }

  function getRow(item: Item) {
    const rowElements: ReactElement[] = [];
    Object.values(titleToCellMap).forEach((row) => rowElements.push(row(item)));
    return rowElements;
  }
};

export default ItemsTable;
