import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { Container, Grid, TextField } from "@material-ui/core";

const AddAudioBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
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
              <TextField
                style={isMobile ? { width: "100%" } : {}}
                required
                id="standard-required"
                label="Book Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
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
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddAudioBook;
