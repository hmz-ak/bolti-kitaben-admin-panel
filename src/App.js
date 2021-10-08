import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavDrawer from "./Components/Drawer/Drawer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/Auth/Login";
import Auth from "./Components/Auth/Auth";
function App() {
  return (
    <div>
      {/* Same as */}
      <Router>
        <div>
          {localStorage.getItem("token") ? (
            <>
              <NavDrawer />
            </>
          ) : (
            <Login />
          )}
        </div>
      </Router>
      <ToastContainer autoClose={5000} closeOnClick />
    </div>
  );
}

export default App;
