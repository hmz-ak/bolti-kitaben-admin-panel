import GenericService from "./GenericService";

class ChapterService extends GenericService {
  getAllChapters = () => this.get("/api/chapters/");
  getChapter = (book_id) => this.get("/api/chapters/" + book_id);
  approveChapter = (id) => this.put('/api/chapters/approve/'+id);

  getSingleChapter = (chapter_id) =>
    this.get("/api/chapters/single/" + chapter_id);

  addChapter = (formData, config) =>
    this.post("/api/chapters/", formData, config);

  deleteChapter = (_id) => this.delete("/api/chapters/" + _id);

  updateChapter = (id, formData, config) =>
    this.put("/api/chapters/" + id, formData, config);
}

let chapterService = new ChapterService();
export default chapterService;
