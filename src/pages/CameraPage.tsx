import { TopGradient } from "../components/Gradients";
import { CustomNavbar, BottomGradient } from "../components";
import { CamaraComponent } from "../components/Camera";
import { Pricestable } from "../components/PricesTable";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "../assets/icons";
import useProductStore from "../store/store";
import { useState } from "react";
import { Price } from "../models/Product";

export const CameraPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addPrice, product, productClass } = useProductStore();
  const [modalData, setModalData] = useState<Price>({
    id: 0,
    price: 0,
    currency: "",
    description: "",
  });

  const handleModalSubmit = async () => {
    await addPrice(modalData, product);
    setModalData({ id: 0, price: 0, currency: "", description: "" });
    onClose();
  };

  return (
    <>
      <div className="pt-3">
        <TopGradient />
        <CustomNavbar />
        <div className="flex mx-4 sm:mx-10 lg:mx-32 mt-5 gap-6">
          <CamaraComponent />
          <div className="w-full">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-xl my-4">Tabla de Precios</h1>
              <Button
                color="success"
                endContent={<PlusIcon />}
                variant="flat"
                onClick={() => onOpen()}
                isDisabled={!productClass ? true : false}
              >
                Add New
              </Button>
            </div>
            <Pricestable />
          </div>
        </div>
        <BottomGradient />
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Agregar Precio
          </ModalHeader>
          <ModalBody>
            <Input
              label="Precio"
              type="number"
              placeholder="Precio"
              value={String(modalData.price)}
              onChange={(e) =>
                setModalData({
                  ...modalData,
                  price: parseFloat(e.target.value),
                })
              }
              variant="bordered"
            />
            <Input
              label="Moneda"
              placeholder="Moneda"
              value={modalData.currency}
              onChange={(e) =>
                setModalData({ ...modalData, currency: e.target.value })
              }
              variant="bordered"
            />
            <Input
              label="Descripción"
              placeholder="Descripción"
              value={modalData.description}
              onChange={(e) =>
                setModalData({ ...modalData, description: e.target.value })
              }
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
