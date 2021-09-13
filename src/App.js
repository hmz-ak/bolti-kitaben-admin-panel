import { BrowserRouter as Router } from "react-router-dom";
import NavDrawer from "./Components/Drawer/Drawer";

function App() {
  return (
    <Router>
      <div>
        <NavDrawer />
      </div>
    </Router>
  );
}

export default App;
