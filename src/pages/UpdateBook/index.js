import React from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useUpdateBook } from "../../hooks/Mutation";
import { useGetBook } from "../../hooks/query";

const UpdateBook = () => {
  const { id } = useParams();
  const { data: bookDetails } = useGetBook(id);
  const { mutate: updateBook } = useUpdateBook();

  const handleUpdateBook = (e) => {
    e.preventDefault();
    const updatedBookDetails = {
      title: e.target.title.value,
      description: e.target.description.value,
    };
    updateBook({ id, updatedBookDetails });
  };

  return (
    <div className="container">
      <Form onSubmit={handleUpdateBook} className="shadow p-5 bg-white rounded">
        <h2>Update Book</h2>
        <div className="my-3">
          <Form.Label>Book Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            defaultValue={bookDetails.title}
            placeholder="Book Title"
          />
        </div>
        <div className="my-3">
          <Form.Label>Book Description</Form.Label>
          <Form.Control
            defaultValue={bookDetails.description}
            name="description"
            as="textarea"
            rows={3}
          />
        </div>
        <Button className="shadow" variant="dark" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateBook;
