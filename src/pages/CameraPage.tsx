import { TopGradient } from '../components/Gradients';
import {
  CustomNavbar,
  BottomGradient,
} from "../components";

export const CameraPage = () => {
  return (
    <div className="pt-3">
      <TopGradient />
      <CustomNavbar />
      <div className="mx-4 sm:mx-10 lg:mx-32 mt-5 flex items-center md:items-start gap-6 md:flex-row flex-col">
        CameraPage
      </div>
      <BottomGradient />
    </div>
  );
};
