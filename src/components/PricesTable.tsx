import { useState } from "react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure } from "@nextui-org/react";
import useProductStore from "../store/store";
import { useEffect } from "react";
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
  const { isOpen: isDeleteModalOpen, onOpen: openDeleteModal, onClose: closeDeleteModal } = useDisclosure();
  const { isOpen: isEditModalOpen, onOpen: openEditModal, onClose: closeEditModal } = useDisclosure();
  const [modalData, setModalData] = useState<Price>({ id: 0, price: 0, currency: "", description: "" });
  const [selectedPriceId, setSelectedPriceId] = useState<number | null>(null);

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
        <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleDeleteModal(item.id)}>
          <DeleteIcon />
        </span>
      </Tooltip>
    </div>
  );

  const handleEdit = (price: Price) => {
    setModalData(price);
    openEditModal();
  };

  const handleDeleteModal = (priceId: number) => {
    setSelectedPriceId(priceId);
    openDeleteModal();
  };

  const handleDelete = async () => {
    if (selectedPriceId !== null) {
      await deletePrice(selectedPriceId);
      setSelectedPriceId(null);
      closeDeleteModal();
    }
  };

  const handleModalSubmit = async () => { 
    await editPrice(modalData, product); 
    closeEditModal();
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
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Editar Precio</ModalHeader>
          <ModalBody>
            <Input
              label="Precio"
              type="number"
              placeholder="Precio"
              value={modalData.price.toString()}
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
            <Button color="danger" variant="flat" onClick={closeEditModal}>
              Cancelar
            </Button>
            <Button color="primary" onClick={handleModalSubmit}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Eliminar Precio</ModalHeader>
          <ModalBody>
            ¿Estás seguro de que deseas eliminar este precio?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onClick={closeDeleteModal}>
              Cancelar
            </Button>
            <Button color="primary" onClick={handleDelete}>
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
