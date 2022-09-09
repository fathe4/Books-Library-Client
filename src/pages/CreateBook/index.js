import { Button, Form } from "react-bootstrap";
import UseAuth from "../../hooks/UseAuth";

const CreateBook = () => {
  const { user } = UseAuth();

  const handleAddBook = (e) => {
    e.preventDefault();
    const bookDetails = {
      title: e.target.title.value,
      description: e.target.description.value,
      uploadDate: Date.now(),
      name: user.displayName,
      email: user.email,
    };
    fetch("http://localhost:5000/books", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },

      body: JSON.stringify(bookDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        data.message && alert("You are not allowed to create books");
        data.insertedId && alert("Book Uploaded");
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <div className="container">
      <Form onSubmit={handleAddBook} className="shadow p-5 bg-white rounded">
        <h2>Create Book</h2>
        <div className="my-3">
          <Form.Label>Book Title</Form.Label>
          <Form.Control
            required
            name="title"
            type="text"
            placeholder="Book Title"
          />
        </div>
        <div className="my-3">
          <Form.Label>Book Description</Form.Label>
          <Form.Control required name="description" as="textarea" rows={3} />
        </div>
        <Button className="shadow" variant="dark" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateBook;
