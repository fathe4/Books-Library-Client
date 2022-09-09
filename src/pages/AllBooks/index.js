import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import UseAuth from "../../hooks/UseAuth";
import { timeSince } from "../../hooks/UseDateToTimeAgo";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const { user, getToken, token, userRoles } = UseAuth();

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:5000/books`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setBooks(data));
    } else {
      getToken();
    }
  }, [token, getToken]);
  const updateUserRole = () => {
    const userNewDetails = {
      email: user.email,
      role: ["VIEW_ALL", "CREATOR", "VIEWER"],
    };
    fetch(`http://localhost:5000/update-user`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(userNewDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount) {
          alert("Congrats you are promoted to a Creator");
          getToken(user.email);
        }
      })
      .catch((error) => {
        setError(error);
      });
  };
  return (
    <div>
      <h2 className="text-center">All Books</h2>
      {!userRoles.includes("CREATOR") && (
        <Button
          className="my-4"
          variant="dark"
          onClick={() => updateUserRole()}
        >
          Apply For Creator role
        </Button>
      )}
      <Table striped bordered hover className="bg-white">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Description</th>
            <th>Author</th>
            <th>Email</th>
            <th>Uploaded Time</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.description.slice(0, 30)}</td>
              <td>{book.name}</td>
              <td>{book.email}</td>
              <td>{timeSince(new Date(book.uploadDate))}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {!books.length && <div className="text-center"> No Books found</div>}
      {error && <div className="text-center text-danger">{error}</div>}
    </div>
  );
};

export default AllBooks;
