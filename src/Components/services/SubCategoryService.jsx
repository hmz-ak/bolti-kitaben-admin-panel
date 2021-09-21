import GenericService from "./GenericService";

class SubCategoryService extends GenericService {
  getSubCategory = () => this.get("/api/subCategories");

  getSingleSubCategory = (id) => this.get("/api/subCategories/" + id);

  addSubCategory = (name) => this.post("/api/subCategories", { name });

  deleteSubCategory = (_id) => this.delete("/api/subCategories/" + _id);

  updateSubCategory = (_id, name) =>
    this.put("/api/subCategories/" + _id, { name });
}

let subCategoryService = new SubCategoryService();
export default subCategoryService;
