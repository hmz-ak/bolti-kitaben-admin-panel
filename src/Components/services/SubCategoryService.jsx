import GenericService from "./GenericService";

class SubCategoryService extends GenericService {
  getSubCategory = () => this.get("/api/subCategories");
  getSubCategoryByParent = (parent) =>
    this.post("/api/subCategories/parent/", { parent });

  getSingleSubCategory = (id) => this.get("/api/subCategories/" + id);

  addSubCategory = (parent, name) =>
    this.post("/api/subCategories", { parent, name });

  deleteSubCategory = (_id) => this.delete("/api/subCategories/" + _id);

  updateSubCategory = (_id, name, parent) =>
    this.put("/api/subCategories/" + _id, { name, parent });
}

let subCategoryService = new SubCategoryService();
export default subCategoryService;
