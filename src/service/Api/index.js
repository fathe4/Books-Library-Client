import Config from "../../common/Config";
import axios, {
  Method,
  AxiosResponse,
  AxiosError,
  AxiosRequestHeaders,
} from "axios";
import User from "./User";
import Games from "./Games";
import Channels from "./Channels";
import Products from "./Products";
import App from "./App";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();
const api = axios.create({
  baseURL: Config.backendApi.baseUrl,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
});

class Api {
  constructor() {
    this.user = User(this);
    this.games = Games(this);
    this.channels = Channels(this);
    this.products = Products(this);
    this.app = App(this);
  }

  post(url, params, data, headers) {
    return this.send(url, "POST", params, data, headers);
  }

  put(url, params, data, headers) {
    return this.send(url, "PUT", params, data, headers);
  }

  get(url, params, data, headers) {
    return this.send(url, "GET", params, data, headers);
  }

  delete(url, params, data, headers) {
    return this.send(url, "DELETE", params, data, headers);
  }

  login(email, password, navigate, location) {
    return new Promise((resolve, reject) => {
      //   api
      //     .post("/eyon/login", {
      //       username,
      //       password,
      //     })
      //     .then((response) => {
      //       resolve(
      //         localStorage.setItem(
      //           "moquiSessionToken",
      //           response.headers["moquisessiontoken"]
      //         )
      //       );
      //     })
      //     .catch((error) => reject(error));
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const destination = location?.state?.from || "/";
          resolve(navigate(destination));
          //   setError("");
        })
        .catch((error) => {
          const errorMessage = error.message;
          reject(errorMessage);
          //   setError(errorMessage);
        });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      api
        .get("/eyon/logout")
        .then(() => resolve(localStorage.removeItem("moquiSessionToken")))
        .catch((error) => reject(error));
    });
  }
}

export default new Api();
