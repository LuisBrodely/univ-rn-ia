import { useEffect } from "react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react";
import useProductStore from "../store/store";

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "CLASS",
  },
  {
    key: "description",
    label: "DESCRIPTION",
  },
  {
    key: "details",
    label: "DETAILS",
  },
];

export const ProductsTable = () => {
  const { products, getProducts } = useProductStore();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Table aria-label="Products Table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={products}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};