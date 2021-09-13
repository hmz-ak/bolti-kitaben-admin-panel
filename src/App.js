import { BrowserRouter as Router } from "react-router-dom";
import NavDrawer from "./Components/Drawer/Drawer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
      {/* Same as */}
      <Router>
        <div>
          <NavDrawer />
        </div>
      </Router>
      <ToastContainer autoClose={5000} closeOnClick />
    </div>
  );
}

export default App;
