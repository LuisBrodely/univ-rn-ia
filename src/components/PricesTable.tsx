import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import useProductStore from "../store/store";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "../assets/icons";
import { Price } from '../models/Product';

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "price",
    label: "PRICE",
  },
  {
    key: "currency",
    label: "CURRENCY",
  },
  {
    key: "description",
    label: "DESCRIPTION",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];

export const Pricestable = () => {
  const { product, productClass, getProduct, editPrice, deletePrice } = useProductStore(); 
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalData, setModalData] = useState<Price>({ id: 0, price: 0, currency: "", description: "" });

  useEffect(() => {
    if (productClass) {
      getProduct(productClass);
    }
  }, [productClass]);

  const renderActionsCell = (item: Price) => (
    <div className="flex items-center gap-2">
      <Tooltip content="Editar">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleEdit(item)}>
          <EditIcon />
        </span>
      </Tooltip>
      <Tooltip content="Eliminar">
        <Popover placement="right">
          <PopoverTrigger>
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon />
            </span>
          </PopoverTrigger>
          <PopoverContent>
          <div className="px-2 py-2">
            <div className="text-small font-bold mb-2">¿Eliminar este precio?</div>
            <Button color="danger" onClick={() => handleDelete(item.id)}>
              Eliminar
            </Button>
          </div>
        </PopoverContent>
        </Popover>
      </Tooltip>
    </div>
  );

  const handleEdit = (price: Price) => {
    setModalData(price);
    onOpen();
  };

  const handleDelete = async (priceId: number) => {
    await deletePrice(priceId);
  };

  const handleModalSubmit = async () => { 
    await editPrice(modalData, product); 
    onClose();
  };

  return (
    <>
      <Table aria-label="Prices Table">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={product.prices}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "actions" ? renderActionsCell(item) : item[columnKey as keyof typeof item]}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Editar Precio</ModalHeader>
          <ModalBody>
            <Input
              label="Precio"
              type="number"
              placeholder="Precio"
              value={String(modalData.price)}
              onChange={(e) => setModalData({ ...modalData, price: parseFloat(e.target.value) })}
              variant="bordered"
            />
            <Input
              label="Moneda"
              placeholder="Moneda"
              value={modalData.currency}
              onChange={(e) => setModalData({ ...modalData, currency: e.target.value })}
              variant="bordered"
            />
            <Input
              label="Descripción"
              placeholder="Descripción"
              value={modalData.description}
              onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
              variant="bordered"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onClick={onClose}>
              Cancelar
            </Button>
            <Button color="primary" onClick={handleModalSubmit}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
