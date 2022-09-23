import { Button, Form } from "react-bootstrap";
import { useCreateBook } from "../../hooks/Mutation";
import UseAuth from "../../hooks/UseAuth";

const CreateBook = () => {
  const { user } = UseAuth();
  const { mutate: createBook } = useCreateBook();

  const handleAddBook = (e) => {
    e.preventDefault();
    const bookDetails = {
      title: e.target.title.value,
      description: e.target.description.value,
      uploadDate: Date.now(),
      name: user.username,
      email: user.email,
    };
    createBook(bookDetails);
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
