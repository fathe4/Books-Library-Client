import { useQuery } from "react-query";
import Api from "../services/Api";

const GetUserInfo = (email) =>
  useQuery("USER_INFO", () => Api.user.getInfo(email), {
    initialData: {},
    enabled: email !== "",
  });
const useGetAllBooks = (email, New = "", old = "") =>
  useQuery(["BOOKS", { New, old }], () => Api.books.getBooks(email, New, old), {
    initialData: [],
    enabled: email !== "",
  });
const useGetBook = (id) =>
  useQuery(["BOOK", { id }], () => Api.books.getBook(id), {
    initialData: {
      title: "",
      description: "",
    },
    enabled: id !== "",
  });

export { GetUserInfo, useGetAllBooks, useGetBook };
