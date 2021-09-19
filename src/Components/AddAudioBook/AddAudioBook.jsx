import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import CategorySelect from "./CategorySelect";
import ImageInput from "../ImageInput/ImageInput";
import bookService from "../services/BookService";
const AddAudioBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImg] = useState(null);
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    setPersonName(event.target.value);
  };
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12}>
          <Grid align={isMobile ? "center" : "left"} container>
            <Grid item xs={12} lg={4}>
              <TextField
                style={isMobile ? { width: "100%" } : {}}
                required
                id="standard-required"
                label="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
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
              <CategorySelect
                personName={personName}
                setPersonName={handleChange}
              />
              {console.log(personName)}
            </Grid>

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
                  formData.append("author", author);
                  formData.append("image", image);
                  formData.append("description", description);
                  formData.append("personName", personName);
                  bookService
                    .addBook(formData, config)
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err));
                }}
              >
                Add Book
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddAudioBook;
