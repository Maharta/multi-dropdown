import { ReactNode, useState } from "react";
import { ReactComponent as CogIcon } from "../assets/cog.svg";
import { ReactComponent as ArrowIcon } from "../assets/arrow.svg";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";

type Menu = "main" | "settings" | "sub-settings";

let isGoBack: boolean = true;
function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState<Menu>("main"); // settings, animals
  const [ref, { height }] = useMeasure();

  function goToSettings() {
    isGoBack = false;
    setActiveMenu("settings");
  }

  function goBackToMain() {
    isGoBack = true;
    setActiveMenu("main");
  }

  function goTosubSetting() {
    isGoBack = false;
    setActiveMenu("sub-settings");
  }

  function goBackToSetting() {
    isGoBack = true;
    setActiveMenu("settings");
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
                  x: isGoBack ? "-110%" : "110%",
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
                initial={{ x: isGoBack ? "-110%" : "110%" }}
                animate={{ x: "0" }}
                exit={{ x: isGoBack ? "110%" : "-110%" }}
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
