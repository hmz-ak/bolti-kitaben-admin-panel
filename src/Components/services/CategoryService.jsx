import GenericService from "./GenericService";

class CategoryService extends GenericService {
  constructor() {
    super();
  }

  getCategory = () => this.get("/api/categories");

  getSingleCategory = (id) => this.get("/api/categories/" + id);

  addCategory = (name) => this.post("/api/categories", { name });

  deleteCategory = (_id) => this.delete("/api/categories/delete/" + _id);

  updateCategory = (_id, formData, config) =>
    this.putData("/api/categories/update/" + _id, formData, config);
}

let categoryService = new CategoryService();
export default categoryService;
