import { TopGradient } from '../components/Gradients';
import {
  CustomNavbar,
  BottomGradient,
} from "../components";
import { CamaraComponent } from '../components/Camera';

export const CameraPage = () => {
  return (
    <div className="pt-3">
      <TopGradient />
      <CustomNavbar />
      <CamaraComponent />
      <BottomGradient />
    </div>
  );
};
