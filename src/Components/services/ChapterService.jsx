import GenericService from "./GenericService";

class ChapterService extends GenericService {
  getChapter = () => this.get("/api/chapters/");

  getSingleChapter = (id) => this.get("/api/chapters/" + id);

  addChapter = (formData, config) =>
    this.post("/api/chapters/", formData, config);

  deleteChapter = (_id) => this.delete("/api/chapters/" + _id);

  updateChapter = (id, formData, config) =>
    this.put("/api/chapters/" + id, formData, config);
}

let chapterService = new ChapterService();
export default chapterService;
