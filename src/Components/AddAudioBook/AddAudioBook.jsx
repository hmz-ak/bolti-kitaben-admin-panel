import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import CategorySelect from "./CategorySelect";
import ImageInput from "../ImageInput/ImageInput";
import bookService from "../services/BookService";
import { toast } from "react-toastify";
import categoryService from "../services/CategoryService";
import subCategoryService from "../services/SubCategoryService";
import Auth from "../Auth/Auth";

const AddAudioBook = () => {
  const [title, setTitle] = useState("");
  const [titleUrdu, setTitleUrdu] = useState("");
  const [author, setAuthor] = useState("");
  const [narrator, setNarrator] = useState("");
  const [contributor, setContributor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImg] = useState(null);
  const [subCategory, setSubCategory] = React.useState("");
  const [genre, setGenre] = React.useState([]);
  const [subCategorySelect, setSubCategorySelect] = React.useState("");
  const [parentCategory, setParentCategory] = React.useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    categoryService
      .getCategory()
      .then((data) => {
        setCategoryData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    subCategoryService
      .getSubCategoryByParent(parentCategory)
      .then((data) => {
        setSubCategory(data);
        console.log(data);
        if (parentCategory != "") {
          setTrigger(true);
        }
      })
      .catch((err) => console.log(err));
  }, [parentCategory]);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return (
    <Auth>
      <Container maxWidth="md">
        <Grid container>
          
          <Grid item xs={12}>
            <Grid align="center" container>
              <Grid align="center" style={{marginTop:10}} item xs={12} lg={6}>
                <TextField
                  style={{ width: "80%" } }
                  required
                  id="standard-required"
                  label="Book Title English"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>

              <Grid align="center" style={{marginTop:10}} item xs={12} lg={6}>
                <TextField
                  style={{ width: "80%" } }
                  required
                  id="standard-required"
                  label="Book Title Urdu"
                  value={titleUrdu}
                  onChange={(e) => setTitleUrdu(e.target.value)}
                />
              </Grid>
              <Grid align="center" style={{marginTop:10}} item xs={12} lg={6}>
                <TextField
                  style={{ width: "80%" } }
                  required
                  id="standard-required"
                  label="Narrator"
                  value={narrator}
                  onChange={(e) => setNarrator(e.target.value)}
                />
              </Grid>
              <Grid align="center" style={{marginTop:10}} item xs={12} lg={6}>
                <TextField
                  style={{ width: "80%" }}
                  required
                  fullWidth
                  id="standard-required"
                  label="Contributor"
                  value={contributor}
                  onChange={(e) => setContributor(e.target.value)}
                />
              </Grid>
              <Grid align="center" style={{marginTop:10}} item xs={12} lg={6}>
                <TextField
                  style={{ width: "80%" }}
                  required
                  fullWidth
                  id="standard-required"
                  label="Author Name"
                  onChange={(e) => setAuthor(e.target.value)}
                  value={author}
                />
              </Grid>
              <Grid align="center" style={{marginTop:10}} item xs={12} lg={6}>
                <FormControl style={{ width: "80%" }}>
                  <InputLabel id="demo-mutiple-chip-label">
                    Parent Category/level 1
                  </InputLabel>
                  <Select
                    native
                    value={parentCategory}
                    onChange={(e) => {
                      setTrigger((prev) => !prev);
                      setParentCategory(e.target.value);
                      if (parentCategory === "") {
                        setSubCategorySelect("");
                      }
                    }}
                  >
                    <option aria-label="None" value="" />
                    {categoryData.map((item) => {
                      return <option value={item.name}>{item.name}</option>;
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid align="center" style={{marginTop:10}} item xs={12} lg={6}>
                {trigger && (
                  <FormControl style={{ width: "80%" }}>
                    <InputLabel id="demo-mutiple-chip-label">
                      Sub Category/ level 2
                    </InputLabel>
                    <Select
                      native
                      value={subCategorySelect}
                      onChange={(e) => {
                        setSubCategorySelect(e.target.value);
                      }}
                    >
                      <option aria-label="None" value="" />
                      {subCategory.map((item) => {
                        return <option value={item.name}>{item.name}</option>;
                      })}
                    </Select>
                  </FormControl>
                )}
              </Grid>
              {trigger && (
                <Grid align="center" style={{marginTop:10}}  item xs={12} lg={6}>
                  <CategorySelect
                    genre={genre}
                    setGenre={(e) => setGenre(e.target.value)}
                  />
                </Grid>
              )}

              <Grid align="center"  xs={12} item>
                <TextField
                  style={{ width: "90%", marginTop: 40 }}
                  id="outlined-multiline-static"
                  label="Enter Book Description"
                  multiline
                  rows={10}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <ImageInput
                  nameAttr={"BookImage"}
                  idAttr={"book-img"}
                  uploadText={"jpeg/jpg/png/gif"}
                  getter={image}
                  setter={(e) => setImg(e.target.files[0])}
                  helperText={", size limit: 40 mb"}
                />
              </Grid>
              <Grid align="center" item xs={12}>
                <Button
                  style={{ width: "30%", marginTop: 30 }}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    console.log(image);
                    const formData = new FormData();
                    formData.append("title", title);
                    formData.append("titleUrdu", titleUrdu);
                    formData.append("narrator", narrator);
                    formData.append("contributor", contributor);
                    formData.append("author", author);
                    formData.append("image", image);
                    formData.append("description", description);
                    formData.append("categories", parentCategory);
                    formData.append("subCategory", subCategorySelect);
                    for (var i = 0; i < genre.length; i++) {
                      formData.append("genre[]", genre[i]);
                    }
                    // for (var key of formData.entries()) {
                    //   console.log(key[0] + ", " + key[1]);
                    // }
                    bookService
                      .addBook(formData, config)
                      .then((res) => {
                        console.log(res);
                        toast.success("Book Added Successfully", {
                          position: toast.POSITION.TOP_CENTER,
                        });
                        setTitle("");
                        setTitleUrdu("");
                        setAuthor("");
                        setImg(null);
                        setDescription("");
                        setGenre([]);
                        setParentCategory("");
                        setSubCategorySelect("");
                      })
                      .catch((err) => {
                        toast.error(err?.response.data, {
                          position: toast.POSITION.TOP_CENTER,
                        });
                      });
                  }}
                >
                  Add Book
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Auth>
  );
};

export default AddAudioBook;
