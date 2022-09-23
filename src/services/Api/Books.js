const Books = (api) => ({
  getBooks: (email, New, old) => api.get("/books", { email, New, old }, {}),
  getBook: (id) => api.get("/book", { id }, {}),
  updateBook: (id, bookDetails) => api.put(`/book/${id}`, {}, { bookDetails }),
  createBook: (bookDetails) => api.post("/books", {}, { bookDetails }),
  deleteBook: (id) => api.delete("/books/delete", {}, { id }),
});
export default Books;
