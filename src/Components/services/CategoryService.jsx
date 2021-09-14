import GenericService from "./GenericService";

class CategoryService extends GenericService {
  constructor() {
    super();
  }

  getCategory = () => this.get("/api/categories");

  getSingleCategory = (id) => this.get("/api/categories/" + id);

  addCategory = (name) => this.post("/api/categories", { name });

  deleteCategory = (_id) => this.delete("/api/categories/" + _id);

  updateCategory = (_id, name) => this.put("/api/categories/" + _id, { name });
}

let categoryService = new CategoryService();
export default categoryService;
