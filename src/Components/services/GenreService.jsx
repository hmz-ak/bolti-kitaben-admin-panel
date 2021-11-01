import GenericService from "./GenericService";

class GenreService extends GenericService {
  getGenre = () => this.get("/api/genres");
  getGenreNames = () => this.get("/api/genres/names");

  getSingleGenre = (id) => this.get("/api/genres/" + id);

  addGenre = (name) => this.post("/api/genres", { name });

  deleteGenre = (_id) => this.delete("/api/genres/" + _id);

  updateGenre = (_id, name) => this.put("/api/genres/" + _id, { name });
}

let genreService = new GenreService();
export default genreService;
