import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { Container, Grid, TextField } from "@material-ui/core";
import CategorySelect from "./CategorySelect";
import ImageInput from "../ImageInput/ImageInput"
const AddAudioBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);

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
              <CategorySelect />
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
                getter={img}
                setter={(e) => setImg(e.target.files[0])}
                helperText={", size limit: 40 mb"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddAudioBook;
