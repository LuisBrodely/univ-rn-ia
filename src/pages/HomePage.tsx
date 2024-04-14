import {
  ProductsTable,
  CustomNavbar,
  TopGradient,
  BottomGradient,
} from "../components";

export const HomePage = () => {
  return (
    <div className="pt-3">
      <TopGradient />
      <CustomNavbar />
      <div className="mx-4 sm:mx-10 lg:mx-32 mt-5">
        <h1 className="font-bold text-xl my-4">Tabla de Productos</h1>
        <ProductsTable />
      </div>
      <BottomGradient />
    </div>
  );
};
