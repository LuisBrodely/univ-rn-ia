import { TopGradient } from '../components/Gradients';
import {
  CustomNavbar,
  UploadPhoto,
  BottomGradient,
  Pricestable,
} from "../components";
import { Button } from '@nextui-org/react';
import { PlusIcon } from '../assets/icons';

export const UploadPhotoPage = () => {
  return (
    <div className="pt-3">
      <TopGradient />
      <CustomNavbar />
      <div className="mx-4 sm:mx-10 lg:mx-32 mt-5 flex items-center md:items-start gap-6 md:flex-row flex-col">
        <UploadPhoto />
        <div className="w-full">
          <div className='flex justify-between items-center'>
            <h1 className="font-bold text-xl my-4">Tabla de Precios</h1>
            <Button color="success" endContent={<PlusIcon />} variant="flat" >
              Add New
            </Button>
          </div>
          <Pricestable />
        </div>
      </div>
      <BottomGradient />
    </div>
  );
};
