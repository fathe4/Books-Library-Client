import axios from "axios";
import Books from "./Books";
import User from "./User";

const api = axios.create({
  baseURL: "https://books-library-server.vercel.app/",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: false,
});

class Api {
  constructor() {
    this.user = User(this);
    this.books = Books(this);
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

  send(url, method, params, data, headers) {
    const defaultHeaders = {
      accessToken: localStorage.getItem("accessToken"),
    };
    return new Promise((resolve, reject) => {
      api({
        url,
        method,
        params,
        headers: { ...defaultHeaders, ...headers },
        data,
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => reject(error));
    });
  }
}
export default new Api();
