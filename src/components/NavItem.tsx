import { ReactNode, useState } from "react";

interface NavItemProps {
  icon: ReactNode;
  children?: ReactNode;
}

function NavItem(props: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="nav-item">
      <a className="icon-button" onClick={() => setIsOpen((isOpen) => !isOpen)}>
        {props.icon}
      </a>

      {isOpen && props.children}
    </li>
  );
}

export default NavItem;
