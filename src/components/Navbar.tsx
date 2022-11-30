import { ReactNode } from "react";

interface NavbarProps {
  children: ReactNode;
}

function Navbar(props: NavbarProps) {
  return (
    <nav className="navbar">
      <ul className="navbar-ul">{props.children}</ul>
    </nav>
  );
}

export default Navbar;
