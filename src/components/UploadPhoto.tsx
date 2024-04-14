import { useState } from "react";
import { Image, Button, Chip } from "@nextui-org/react";
import useProductStore from "../store/store";
import axiosInstanceRN from "../api/axiosInstanceRN";

export const UploadPhoto = () => {
  const { setProductClass, productClass, product } = useProductStore();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageSubmit = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);

      try {
        const response = await axiosInstanceRN.post('/images/upload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const productClass = response.data.data;
        setProductClass(productClass);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div>
      {!imageUrl && (
        <div className="col-span-full w-80">
          <div className="mt-2 mb-3 flex justify-center items-center rounded-lg border border-dashed border-gray-200/25 px-6 py-10 h-80">
            <div className="text-center">
              <div className="mt-4 flex z-60 text-sm leading-6 text-gray-200">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-semibold text-blue-500/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500/90 focus-within:ring-offset-2 hover:text-blue-500"
                >
                  <span>Cargar una imagen</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageUpload} />
                </label>
              </div>
              <p className="text-xs leading-5 text-gray-400">PNG, JPG o WEBP</p>
            </div>
          </div>
        </div>
      )}
      {imageUrl && (
        <Image
          isBlurred
          width={320}
          src={imageUrl}
          alt="Imagen cargada"
          className="mb-3"
        />
      )}
      {imageUrl && !productClass && (
        <Button className="w-80" color="primary" onClick={handleImageSubmit} fullWidth variant="flat">Obtener CLASS</Button>
      )}
      {imageUrl && productClass && (
        <div className="w-80 mt-2">
          <h2 className="font-bold text-5xl mb-3">{productClass}</h2>
          <Chip color="secondary" size="sm" className="w-80" variant="dot">{ product.description }</Chip>
          <h3 className="mt-3 text-sm text-slate-300">{ product.details }</h3>
        </div>
      )}
    </div>
  );
};
