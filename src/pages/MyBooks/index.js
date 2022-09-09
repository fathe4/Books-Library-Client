import { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { timeSince } from "../../hooks/UseDateToTimeAgo";
import { Dropdown, DropdownButton, Table } from "react-bootstrap";
import UseAuth from "../../hooks/UseAuth";

const MyBooks = () => {
  const { user } = UseAuth();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookQuery, setBookQuery] = useState(`books?email=${user.email}`);
  useEffect(() => {
    async function fetchData() {
      if (isLoading || bookQuery) {
        await fetch(`http://localhost:5000/${bookQuery}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => setBooks(data))
          .finally(() => setIsLoading(false));
      }
    }
    fetchData();
  }, [bookQuery, isLoading]);

  const handleDeleteBook = (book) => {
    const confirmDelete = window.confirm("Are you sure you want to delete");
    if (!confirmDelete) {
      return;
    }
    fetch(`http://localhost:5000/books/delete?id=${book._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.deletedCount) {
          setIsLoading(true);
          alert("Book Deleted");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
              onClick={() => setBookQuery(`books?old=1&email=${user.email}`)}
            >
              10 minutes ago
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => setBookQuery(`books?new=1&email=${user.email}`)}
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
              <td>{book.description.slice(0, 30)}</td>
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
