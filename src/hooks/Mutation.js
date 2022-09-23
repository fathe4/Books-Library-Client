import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Api from "../services/Api";

const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation(({ email, role }) => Api.user.updateRole(email, role), {
    onSuccess: () => {
      alert("User role updated");
      queryClient.invalidateQueries("USER_INFO");
    },
  });
};

const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => Api.books.deleteBook(id), {
    onSuccess: () => queryClient.invalidateQueries("BOOKS"),
  });
};

const useCreateBook = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation((bookDetails) => Api.books.createBook(bookDetails), {
    onSuccess: () => {
      alert("Book Uploaded");
      navigate("/my-books");
      queryClient.invalidateQueries("BOOKS");
    },
  });
};

const useUpdateBook = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, updatedBookDetails }) =>
      Api.books.updateBook(id, updatedBookDetails),
    {
      onSuccess: () => {
        alert("Book Updated");
        navigate("/my-books");
        queryClient.invalidateQueries("BOOKS");
      },
    }
  );
};

export { useUpdateUserRole, useDeleteBook, useCreateBook, useUpdateBook };
