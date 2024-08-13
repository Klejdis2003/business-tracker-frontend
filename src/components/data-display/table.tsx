import {
  Table as NextTable,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  TableProps as NextTableProps,
} from "@nextui-org/table";
import React, { FC, ReactElement, ReactNode } from "react";
import { useLongPress } from "@react-aria/interactions";

type TableProps = {
  headers: (ReactElement | string)[];
  rows: ReactElement[][];
  onTableRowLongPress?: () => void;
} & NextTableProps;

/**
 * Thin wrapper around NextUI's Table component to make it easier to use by passing headers and rows as props and also to provide SSR support, since
 * we can only declare 'use client' in the file level. That way, it allows for data fetching in the parent component and passing it as props to this.
 * @param headers Array of any React elements to be used at the top row
 * @param rows Matrix of any React elements to be used as rows. A row contains of different elements that will be displayed in the same row, otherwise known
 * as cells or columns.
 * @param onTableRowLongPress Callback function to be called when a row is long pressed
 * @param props The original props of the NextUI Table component. See {@link NextTableProps}
 */
const Table: FC<TableProps> = ({
  headers,
  rows,
  onTableRowLongPress,
  ...props
}) => {
  const longPressProps = useLongPress({
    onLongPress: () => {
      if (onTableRowLongPress) onTableRowLongPress();
    },
  });
  headers = headers.map((header, index) => {
    if (typeof header === "string")
      return (
        <h1 key={index} className={"text-medium"}>
          {header}
        </h1>
      );
    return header;
  });

  return (
    <NextTable {...props}>
      <TableHeader columns={headers}>
        {headers.map((column, index) => (
          <TableColumn key={`header-${index}`}>{column}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={`row-${rowIndex}`} {...longPressProps}>
            {row.map((cell, index) => (
              <TableCell key={`cell-${rowIndex}${index}`}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </NextTable>
  );
};

export default Table;
