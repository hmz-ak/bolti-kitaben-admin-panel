import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

import GenericService from "./GenericService";

class UserService extends GenericService {
  constructor() {
    super();
  }

  login = (email, password) =>
    new Promise((resolve, reject) => {
      this.post("/api/users/login", { email, password })
        .then((data) => {
          console.log(data);
          if (data.role === "admin") {
            localStorage.setItem("token", data.token);
            resolve(data.token);
          } else {
            toast.error("Invalid Email and Password", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });

  register = (name, email, password) =>
    this.post("/api/users/register", { name, email, password });
  logout = () => {
    localStorage.removeItem("token");
  };

  isLoggedIn = () => {
    return localStorage.getItem("token") ? true : false;
  };

  // token_is_valid = () =>
  //   new Promise((resolve, reject) => {
  //     this.post("/api/users/login_verify", localStorage.getItem("token"))
  //       .then(() => {
  //         return true;
  //       })
  //       .catch(() => {
  //         return false;
  //       });
  //   });

  getLoggedInUser = () => {
    try {
      const jwt = localStorage.getItem("token");
      return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
  };

  isAdmin = () => {
    if (this.isLoggedIn()) {
      if (this.getLoggedInUser().role == "admin") return true;
      else return false;
    } else return false;
  };
}
let userService = new UserService();
export default userService;
