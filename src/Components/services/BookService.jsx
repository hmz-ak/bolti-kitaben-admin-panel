import GenericService from "./GenericService";

class BookService extends GenericService {
  getBook = () => this.get("/api/books/");

  getSingleBook = (id) => this.get("/api/books/" + id);

  addBook = (formData, config) => this.post("/api/books/", formData, config);

  deleteBook = (_id) => this.delete("/api/books/" + _id);

  updateBook = (_id, formData, config) =>
    this.put("/api/books/" + _id, formData, config);
}

let bookService = new BookService();
export default bookService;
