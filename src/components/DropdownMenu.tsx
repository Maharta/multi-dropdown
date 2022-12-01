import { ReactNode, useState } from "react";
import { ReactComponent as CogIcon } from "../assets/cog.svg";
import { ReactComponent as ArrowIcon } from "../assets/arrow.svg";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";
import useStateCallback from "../hooks/useStateCallback";

type Menu = "main" | "settings" | "sub-settings";

let isGoingBack: boolean;
function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState<Menu>("main"); // settings, animals
  const [isGoingTo, setIsGoingTo] = useStateCallback<Menu | null>(null);
  const [ref, { height }] = useMeasure();

  function goToSettings() {
    isGoingBack = false;
    setIsGoingTo("settings", () => setActiveMenu("settings"));
  }

  function goBackToMain() {
    isGoingBack = true;
    setIsGoingTo("main", () => setActiveMenu("main"));
  }

  function goTosubSetting() {
    isGoingBack = false;
    setIsGoingTo("sub-settings", () => setActiveMenu("sub-settings"));
  }

  function goBackToSetting() {
    isGoingBack = true;
    setIsGoingTo("settings", () => setActiveMenu("settings"));
  }

  return (
    <motion.div
      initial={{
        height: 0,
      }}
      animate={{
        height,
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="dropdown"
    >
      <MotionConfig transition={{ duration: 0.5 }}>
        <div style={{ position: "relative" }} ref={ref}>
          <AnimatePresence initial={false} mode="popLayout">
            {activeMenu === "main" && (
              <motion.div
                initial={{
                  x: isGoingBack ? "-110%" : "110%",
                }}
                animate={{ x: "0" }}
                exit={{ x: "-110%" }}
                key="main"
              >
                <DropdownItem>My Profile</DropdownItem>
                <DropdownItem onClick={goToSettings} leftIcon={<CogIcon />}>
                  Settings
                </DropdownItem>
              </motion.div>
            )}
            {activeMenu === "settings" && (
              <motion.div
                initial={{ x: isGoingBack ? "-110%" : "110%" }}
                animate={{ x: "0" }}
                exit={{ x: isGoingTo === "sub-settings" ? "-110%" : "110%" }}
                key="settings"
              >
                <DropdownItem onClick={goBackToMain} leftIcon={<ArrowIcon />}>
                  Back
                </DropdownItem>
                <DropdownItem onClick={goTosubSetting}>
                  Sub Setting
                </DropdownItem>
              </motion.div>
            )}
            {activeMenu === "sub-settings" && (
              <motion.div
                initial={{ x: "110%" }}
                animate={{ x: 0 }}
                exit={{ x: "110%" }}
                key="sub-settings"
              >
                <DropdownItem
                  onClick={goBackToSetting}
                  leftIcon={<ArrowIcon />}
                >
                  Settings
                </DropdownItem>
                <DropdownItem onClick={goTosubSetting}>Animals</DropdownItem>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MotionConfig>
    </motion.div>
  );
}

interface DropdownItemProps {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
}

function DropdownItem(props: DropdownItemProps) {
  return (
    <a onClick={props.onClick} className="menu-item">
      <span className="icon-button">{props.leftIcon}</span>
      {props.children}
      <span className="icon-right">{props.rightIcon}</span>
    </a>
  );
}

export default DropdownMenu;
