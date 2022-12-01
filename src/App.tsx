import Navbar from "./components/Navbar";
import NavItem from "./components/NavItem";
import { ReactComponent as CaretIcon } from "./assets/caret.svg";
import DropdownMenu from "./components/DropdownMenu";

function App() {
  return (
    <div className="App">
      <Navbar>
        <NavItem icon={<CaretIcon />}>
          <DropdownMenu />
        </NavItem>
      </Navbar>
    </div>
  );
}

export default App;
