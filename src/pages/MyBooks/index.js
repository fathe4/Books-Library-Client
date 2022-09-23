import { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { timeSince } from "../../hooks/UseDateToTimeAgo";
import { Dropdown, DropdownButton, Table } from "react-bootstrap";
import UseAuth from "../../hooks/UseAuth";
import { useDeleteBook } from "../../hooks/Mutation";
import { useGetAllBooks } from "../../hooks/query";

const MyBooks = () => {
  const { user } = UseAuth();
  const [filterNewBooks, setFilterNewBooks] = useState("");
  const [filterOldBooks, setFilterOldBooks] = useState("");
  const { mutate: deleteBook } = useDeleteBook();
  const { data: books } = useGetAllBooks(
    user.email,
    filterNewBooks,
    filterOldBooks
  );

  const handleDeleteBook = (book) => {
    const confirmDelete = window.confirm("Are you sure you want to delete");
    if (!confirmDelete) {
      return;
    }
    deleteBook(book._id);
  };
  return (
    <div>
      <h2 className="text-center">My Books</h2>
      <div className="d-flex justify-content-between py-4">
        <div></div>
        <div>
          <DropdownButton variant="dark" title="Filter books">
            <Dropdown.Item
              as="button"
              onClick={() => {
                setFilterNewBooks("");
                setFilterOldBooks("1");
              }}
            >
              10 minutes ago
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => {
                setFilterNewBooks(`1`);
                setFilterOldBooks("");
              }}
            >
              Within 10 minutes
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      <Table striped bordered hover className="bg-white">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Description</th>
            <th>Author</th>
            <th>Uploaded Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.description?.slice(0, 30)}</td>
              <td>{book.name}</td>
              <td>{timeSince(new Date(book.uploadDate))}</td>
              <td className="d-flex gap-3">
                <Link to={`/update-book/${book._id}`}>
                  <AiFillEdit
                    className="text-success h5"
                    style={{ cursor: "pointer" }}
                  />
                </Link>
                <AiFillDelete
                  onClick={() => handleDeleteBook(book)}
                  className="text-danger h5"
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {!books.length && <div className="text-center"> No Books found</div>}
    </div>
  );
};

export default MyBooks;
