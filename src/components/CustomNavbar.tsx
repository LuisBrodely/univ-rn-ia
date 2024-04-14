import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { AiLogo } from "../assets/icons/AiLogo";

export const CustomNavbar = () => {
  return (
    <Navbar
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <Link to={'/'}>
        <NavbarBrand>
          <AiLogo />
          <p className="font-bold text-inherit">IA - Red Neuronal</p>
        </NavbarBrand>
      </Link>
      
      <NavbarContent justify="end">
        <NavbarItem>
          <Link to={'/camera'}>
            <Button color="secondary" href="#" variant="flat">
              Tomar foto
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to={'/upload'}>
            <Button color="primary" href="#" variant="flat">
              Subir imagen
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
