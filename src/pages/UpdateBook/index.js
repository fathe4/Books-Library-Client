import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

const UpdateBook = () => {
  const [bookDetails, setBookDetails] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/book?id=${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBookDetails(data[0]));
  }, [id]);
  const handleUpdateBook = (e) => {
    e.preventDefault();

    const updatedBookDetails = {
      title: e.target.title.value,
      description: e.target.description.value,
    };
    fetch(`http://localhost:5000/book/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(updatedBookDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount) {
          alert("Book Updated");
          setError("");
        }
      })
      .catch((error) => setError(error));
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
      {error && error}
    </div>
  );
};

export default UpdateBook;
