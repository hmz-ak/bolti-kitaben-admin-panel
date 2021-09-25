import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import ImageInput from "../ImageInput/ImageInput";
import { toast } from "react-toastify";
import chapterService from "../services/ChapterService";

const AddChapter = (props) => {
  const [title, setTitle] = useState("");
  const [titleUrdu, setTitleUrdu] = useState("");

  const [audio, setAudio] = useState(null);

  const id = props.match.params.id;

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
            <Grid item xs={12} lg={6}>
              <TextField
                style={isMobile ? { width: "100%" } : {}}
                required
                id="standard-required"
                label="Book Title English"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                style={isMobile ? { width: "100%" } : {}}
                required
                id="standard-required"
                label="Book Title Urdu"
                value={titleUrdu}
                onChange={(e) => setTitleUrdu(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <ImageInput
                nameAttr={"ChapterAudio"}
                idAttr={"chapter-audio"}
                uploadText={"mp3"}
                getter={audio}
                setter={(e) => setAudio(e.target.files[0])}
                helperText={", size limit: 100 mb"}
              />
            </Grid>
            <Grid align="center" item xs={12}>
              <Button
                style={{ width: "30%", marginTop: 30 }}
                color="primary"
                variant="contained"
                onClick={() => {
                  const formData = new FormData();
                  formData.append("book_id", id);
                  formData.append("title", title);
                  formData.append("titleUrdu", titleUrdu);
                  formData.append("audio", audio);

                  chapterService
                    .addChapter(formData, config)
                    .then((res) => {
                      console.log(res);
                      toast.success("Chapter Added Successfully", {
                        position: toast.POSITION.TOP_CENTER,
                      });
                      setTitle("");
                      setTitleUrdu("");

                      setAudio(null);
                    })
                    .catch((err) => {
                      toast.error(err?.response.data, {
                        position: toast.POSITION.TOP_CENTER,
                      });
                    });
                }}
              >
                Add Chapter
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withRouter(AddChapter);
