import { Navbar } from "flowbite-react";
import ShoppingCartDropdown from "../ShoppingCart/ShoppingCartDropdown";
import Link from "next/link";

const Nav = () => {
  return (
    <Navbar fluid rounded>
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        <Link href="/">Bachelorproef PoC </Link>
      </span>

      <div className="flex md:order-2">
        <ShoppingCartDropdown />
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
};
export default Nav;
