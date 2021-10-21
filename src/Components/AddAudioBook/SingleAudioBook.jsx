import React, { useState } from "react";
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
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import subCategoryService from "../services/SubCategoryService";
import categoryService from "../services/CategoryService";
import Auth from "../Auth/Auth";
const SingleAudioBook = () => {
  const [title, setTitle] = useState("");
  const [titleUrdu, setTitleUrdu] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImg] = useState(null);
  const [subCategory, setSubCategory] = React.useState("");
  const [genre, setGenre] = React.useState([]);
  const [subCategorySelect, setSubCategorySelect] = React.useState("");
  const [parentCategory, setParentCategory] = React.useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [narrator, setNarrator] = useState("");

  const [trigger, setTrigger] = useState(false);

  const id = useParams();
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
  useEffect(() => {
    console.log(id.id);
    bookService
      .getSingleBook(id.id)
      .then((data) => {
        console.log(data);
        setTitle(data.title);
        setAuthor(data.author);
        setNarrator(data.narrator);
        setDescription(data.description);
        setTitleUrdu(data.titleUrdu);
        setParentCategory(data.categories);
        setGenre([...data.genre]);
        setSubCategorySelect(data.subCategory);
      })
      .catch((err) => console.log(err));
  }, []);
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
            <Grid align={isMobile ? "center" : "left"} container>
              <Grid item xs={12} lg={3}>
                <TextField
                  style={isMobile ? { width: "100%" } : {}}
                  required
                  id="standard-required"
                  label="Book Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  style={isMobile ? { width: "100%" } : {}}
                  id="standard-required"
                  label="Book Title Urdu"
                  value={titleUrdu}
                  onChange={(e) => setTitleUrdu(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  style={isMobile ? { width: "100%" } : {}}
                  id="standard-required"
                  label="Narrator"
                  value={narrator}
                  onChange={(e) => setNarrator(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  style={isMobile ? { width: "100%" } : {}}
                  required
                  id="standard-required"
                  label="Author Name"
                  onChange={(e) => setAuthor(e.target.value)}
                  value={author}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <FormControl style={{ width: "60%", marginTop: 20 }}>
                  <InputLabel id="demo-mutiple-chip-label">
                    Parent Category
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
              <Grid item xs={12} lg={4}>
                {trigger && (
                  <FormControl style={{ width: "60%", marginTop: 20 }}>
                    <InputLabel id="demo-mutiple-chip-label">
                      Sub Category
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
                <Grid style={{ marginTop: 20 }} item xs={12} lg={4}>
                  <CategorySelect
                    genre={genre}
                    setGenre={(e) => setGenre(e.target.value)}
                  />
                </Grid>
              )}

              <Grid xs={12} item>
                <TextField
                  style={{ width: "100%", marginTop: 40 }}
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
                    formData.append("author", author);
                    formData.append("narrator", narrator);
                    formData.append("image", image);
                    formData.append("description", description);
                    formData.append("categories", parentCategory);
                    formData.append("subCategory", subCategorySelect);
                    for (var i = 0; i < genre.length; i++) {
                      formData.append("genre[]", genre[i]);
                    }
                    bookService
                      .updateBook(id.id, formData, config)
                      .then((res) => {
                        console.log(res);
                        toast.success("Book Updated Successfully", {
                          position: toast.POSITION.TOP_CENTER,
                        });
                      })
                      .catch((err) => {
                        toast.error(err?.response.data, {
                          position: toast.POSITION.TOP_CENTER,
                        });
                      });
                  }}
                >
                  Update Book
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Auth>
  );
};

export default SingleAudioBook;
