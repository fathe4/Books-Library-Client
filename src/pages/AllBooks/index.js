import { Button, Table } from "react-bootstrap";
import { useUpdateUserRole } from "../../hooks/Mutation";
import { useGetAllBooks } from "../../hooks/query";
import UseAuth from "../../hooks/UseAuth";
import { timeSince } from "../../hooks/UseDateToTimeAgo";

const AllBooks = () => {
  const { user, userRoles } = UseAuth();
  const { data: books } = useGetAllBooks();
  const { mutate: updateUserRole, isError: isUserRoleUpdateError } =
    useUpdateUserRole();

  const handleUserRole = () => {
    const userNewDetails = {
      email: user.email,
      role: ["VIEW_ALL", "CREATOR", "VIEWER"],
    };
    updateUserRole(userNewDetails);
  };

  return (
    <div>
      <h2 className="text-center">All Books</h2>
      {!userRoles.includes("CREATOR") && (
        <Button
          className="my-4"
          variant="dark"
          onClick={() => handleUserRole()}
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
              <td>{book.description?.slice(0, 30)}</td>
              <td>{book.name}</td>
              <td>{book.email}</td>
              <td>{timeSince(new Date(book.uploadDate))}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {!books.length && <div className="text-center"> No Books found</div>}
      {isUserRoleUpdateError && (
        <div className="text-center text-danger">{isUserRoleUpdateError}</div>
      )}
    </div>
  );
};

export default AllBooks;
